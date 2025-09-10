'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useDictionary } from '@/context/DictionaryProvider';

export function Header() {
  const router = useRouter();
  const dict = useDictionary();
  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Changes the language of the website by pushing a new route to the router.
   *
   * @param lng - The language to change to. Must be a string of either "en" or "vi".
   */
  /*******  409479a4-3bf8-4403-874b-43d0a886463b  *******/

  const changeLanguage = (lng: string) => {
    router.push(`/${lng}`);
  };

  return (
    <header className="bg-white p-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">{dict.appTitle}</h1>
        <div className="flex gap-2">
          <Button onClick={() => changeLanguage('en')} variant="outline">
            EN
          </Button>
          <Button onClick={() => changeLanguage('vi')} variant="outline">
            VI
          </Button>
        </div>
      </div>
    </header>
  );
}
