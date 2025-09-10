import { getDictionary, Locale } from '@/lib/get-dictionary';
import { Header } from '@/components/Header';
import Image from 'next/image';
import { HashGeneratorComponent } from '@/components/HashGeneratorComp';

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(locale);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="bg-muted rounded-lg max-h-[300px] w-[96%] h-[200px] mx-auto absolute top-[78px] left-0 right-0 z-[1]">
          <Image
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            alt="Photo by Drew Beamer"
            fill
            className="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
        <div className="container mx-auto px-4 md:px-10 z-[2] relative">
          <span className="mb-8 text-left text-gray-600 w-full break-words">
            *{dict.descriptionGeneral} {dict.enterCodePrompt}
          </span>
          <p className="mb-4 text-center text-gray-600"></p>
          <HashGeneratorComponent />
        </div>
      </div>
    </>
  );
}
