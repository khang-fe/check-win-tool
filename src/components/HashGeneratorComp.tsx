'use client';
import { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { initGame } from '@/actions/init';
import { useDictionary } from '@/context/DictionaryProvider';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ClipboardCopy, Copy } from 'lucide-react';
import { toast } from 'sonner';

export function HashGeneratorComponent() {
  const [code, setCode] = useState('');
  const [isPending, startTransition] = useTransition();
  const [hash, setHash] = useState<string | null>(null);

  const dict = useDictionary();

  const handleSubmit = async () => {
    setHash(null);
    startTransition(async () => {
      try {
        // get fairCode + merkleRoot and generate hash256
        if (!code) return;
        const { sha256 } = await import('@/lib/utils');
        const jsonData = JSON.parse(code);
        console.log('Parsed JSON Data:', jsonData);
        if (!jsonData?.data?.serverSeedHashed || !jsonData?.data?.merkleRoot) {
          console.error('Invalid JSON structure');
          return;
        }
        const combinedString = `${jsonData?.data.serverSeedHashed}${jsonData?.data.merkleRoot}`;
        console.log('Combined String:', combinedString);
        const generatedHash = sha256(combinedString);
        console.log('Generated SHA-256 Hash:', generatedHash);
        setHash(generatedHash);
      } catch (err) {
        toast.error(dict.invalidCode);
        console.error(err);
      }
    });
  };

  const initGameCode = async () => {
    startTransition(async () => {
      try {
        const data = await initGame();
        const stringifiedData = JSON.stringify(data);
        console.log('Game initialized:', data);
        console.log('Stringified data:', stringifiedData);
        if (data && stringifiedData) {
          setCode(stringifiedData);
        }
      } catch (err) {
        console.error(err);
      }
    });
  };

  const handleCopy = () => {
    console.log('Copy hash:', hash);
    if (hash) {
      navigator.clipboard.writeText(hash);
      toast(dict.copied, {
        description: dict.checkHashOnExplorer,
        action: {
          label: dict.go,
          onClick: () =>
            window.open(`https://example.com/check/${hash}`, '_blank'),
        },
      });
    }
  };

  const PasteButton = async () => {
    const clipboardData = await navigator.clipboard.readText();
    if (!clipboardData) {
      toast.error(dict.clipboardEmpty);
      return;
    }
    setCode(clipboardData);
  };

  return (
    <div className="container mx-auto py-2 md:py-8">
      <h2 className="mb-4 text-xl font-semibold text-center">
        {dict.hashGenerator}
      </h2>

      <div className="flex align-top justify-start my-4">
        <Button
          className="max-w-[35px] mr-[4%] md:mr-4"
          size="icon"
          onClick={PasteButton}
        >
          <ClipboardCopy className="h-[1rem] w-[1rem] scale-100" />
        </Button>
        <Textarea
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder={dict.codePlaceholder}
          style={{ color: 'black' }}
          className="min-h-[120px] bg-white"
        />
      </div>

      <Button
        className="max-w-[300px] w-[48%] mr-[4%] md:mr-4"
        onClick={initGameCode}
        disabled={isPending}
      >
        {isPending ? dict.loadingInit : dict.initGameCode}
      </Button>

      <Button
        className="max-w-[300px] w-[48%]"
        onClick={handleSubmit}
        disabled={isPending || !code}
      >
        {isPending ? `${dict.generateHash}...` : dict.generateHash}
      </Button>

      {/* Kết quả hash */}
      {hash && (
        <Card className="mt-6 shadow-lg rounded-2xl">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-lg">{dict.hashResult}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              title="Copy hash"
            >
              <Copy className="h-5 w-5" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-900 text-green-400 font-mono p-4 rounded-xl text-sm break-all">
              {hash}
            </div>

            <Button
              className="mt-4 w-full"
              onClick={() =>
                window.open(`https://example.com/check/${hash}`, '_blank')
              }
            >
              {dict.checkHashOnExplorer}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
