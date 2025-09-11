'use client';
import { useCallback, useEffect, useState } from 'react';
import { Copy, Equal } from 'lucide-react';
import { toast } from 'sonner';
import { sha256 } from '@/lib/utils';
import { uploadHexString } from '@/actions/init';
import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Separator } from './ui/separator';
import { Textarea } from './ui/textarea';
import { useDictionary } from '@/context/DictionaryProvider';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A component for generating a Fair Code based on a Server Seed Hashed and a Merkle Root.
 *
 * The component takes in two inputs:
 *  - Server Seed Hashed: the hashed server seed
 *  - Merkle Root: the merkle root of the game
 *
 * When the user provides both inputs, the component will generate a Fair Code
 * by combining the two inputs and hashing them with SHA256.
 *
 * The component also provides a text area for the user to paste a report code from the game.
 * When the user clicks the "Verify Link" button, the component will upload the report code to the server
 * and verify the Fair Code.
 *
 * @returns A JSX element containing the component.
 */
/*******  e999bce1-b56e-4b9e-9f56-57ff3932d659  *******/ export function HashGeneratorComponent() {
  const [serverhash, setServerhash] = useState<string>('');
  const [merkleRoot, setMerkleRoot] = useState<string>('');
  const [fairCode, setFairCode] = useState<string>('');
  const [reportCode, setReportCode] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const dict = useDictionary();

  const PasteButton = async (inputField: string) => {
    const clipboardData = await navigator.clipboard.readText();
    if (!clipboardData) {
      toast.error('somethineg went wrong');
      return;
    }
    if (inputField === 'serverhash') setServerhash(clipboardData);
    if (inputField === 'merkleRoot') setMerkleRoot(clipboardData);
    if (inputField === 'reportCode') setReportCode(clipboardData);
    toast.success('Pasted from clipboard');
  };

  const combineHash = useCallback(async () => {
    console.log('combineHash called');
    const hash = serverhash + merkleRoot;
    const generatedHash = await sha256(hash);
    console.log('generatedHash', generatedHash);

    setFairCode(generatedHash);
  }, [serverhash, merkleRoot]);

  useEffect(() => {
    if (serverhash && merkleRoot) {
      combineHash();
    } else {
      setFairCode('');
    }
  }, [serverhash, merkleRoot, combineHash]);

  const onChangeServerHash = (e: React.ChangeEvent<HTMLInputElement>) => {
    setServerhash(e.target.value);
  };
  const onChangeMerkleRoot = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMerkleRoot(e.target.value);
  };

  const handleUpload = async () => {
    try {
      if (!reportCode) {
        toast.error('Please enter a report code');
        return;
      }
      setIsUploading(true);
      const res = await uploadHexString(reportCode);
      console.log('Upload response:', res);
      if (res && res.url) {
        window.open(res.url, '_blank');
        toast.success('Upload successful! Opening link...');
      } else {
        toast.error('Upload failed: No URL returned');
      }
    } catch (err) {
      toast.error(dict.reportCodeError);
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <div className="container mt-5">
        <Card>
          <CardContent>
            <div className="grid w-full items-center gap-3 mt-4">
              <div className="flex justify-between w-full">
                <Label htmlFor="serverhash" className="text-lg">
                  Server Seed Hashed:
                </Label>
                <Button
                  onClick={() => PasteButton('serverhash')}
                  type="submit"
                  variant="outline"
                >
                  <Copy className="h-4 w-4"></Copy>
                  <span className="text-sm">Paste</span>
                </Button>
              </div>
              <div className="flex w-full items-center gap-3">
                <Input
                  onChange={onChangeServerHash}
                  value={serverhash}
                  id="serverhash"
                  type="text"
                  className="w-full h-12"
                />
              </div>
            </div>
            <div className="grid w-full items-center gap-3 mt-4">
              <div className="flex justify-between w-full">
                <Label htmlFor="serverhash" className="text-lg">
                  Merkle Root:
                </Label>
                <Button
                  onClick={() => PasteButton('merkleRoot')}
                  type="submit"
                  variant="outline"
                >
                  <Copy className="h-4 w-4"></Copy>
                  <span className="text-sm">Paste</span>
                </Button>
              </div>
              <div className="flex w-full items-center gap-3">
                <Input
                  onChange={onChangeMerkleRoot}
                  value={merkleRoot}
                  id="merkleRoot"
                  type="text"
                  className="w-full h-12"
                />
              </div>
            </div>
            <div className="grid w-full max-w-md items-center gap-3 mt-4">
              <Label htmlFor="fairCode" className="text-lg">
                Fair Code:
              </Label>

              <div className="flex w-full max-w-md items-center gap-3">
                <div className="flex items-center gap-1">
                  <span className="text-sm">SHA256</span>
                  <Equal className="h-2 w-2"></Equal>
                </div>
                <span>
                  {fairCode ? (
                    <div className="flex flex-col gap-2 bg-slate-100 p-3 rounded-md">
                      <span className="font-mono break-all text-sm">
                        {fairCode}
                      </span>
                    </div>
                  ) : (
                    'Fair code will be generated here...'
                  )}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col items-center my-4">
          <Separator className="my-2" />
          <span className="text-sm text-center break-words">
            {dict.originalReportCodePrompt}
          </span>
          <Separator className="my-2" />
        </div>

        <div className="grid w-full items-center gap-3">
          <div className="flex justify-between w-full">
            <Label htmlFor="reportCode" className="text-lg">
              Report Code:{' '}
            </Label>
            <Button
              onClick={() => PasteButton('reportCode')}
              type="submit"
              variant="outline"
            >
              <Copy className="h-4 w-4"></Copy>
              <span className="text-sm">Paste</span>
            </Button>
          </div>

          <Textarea
            onChange={e => setReportCode(e.target.value)}
            value={reportCode}
            placeholder={'Paste report code here...'}
            id="reportCode"
            className="h-[140px] w-full max-w-full"
          />

          <Button
            disabled={isUploading || !reportCode}
            onClick={handleUpload}
            type="submit"
            variant="outline"
          >
            <span className="text-sm">
              {isUploading ? 'Uploading...' : 'Verify'}
            </span>
          </Button>
        </div>
      </div>
    </>
  );
}
