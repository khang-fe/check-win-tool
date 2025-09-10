'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useDictionary } from '@/context/DictionaryProvider';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sun, Moon } from 'lucide-react';

export function Header() {
  const { setTheme } = useTheme();
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
    <header className="p-4 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">{dict.appTitle}</h1>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                <span className="sr-only">{dict.toggleTheme}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                {dict.light}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                {dict.dark}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                {dict.system}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
