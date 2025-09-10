import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DictionaryProvider } from '@/context/DictionaryProvider';
import { getDictionary } from '@/lib/get-dictionary';
import { LocaleProvider } from '@/context/LocaleProvider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/context/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Game Explorer',
  description: 'Explore Ethereum game tables and rounds',
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dict = await getDictionary(locale as 'en' | 'vi');

  return (
    <html lang={locale} suppressHydrationWarning>
      <DictionaryProvider dict={dict}>
        <LocaleProvider locale={locale as 'en' | 'vi'}>
          <body className={inter.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster />
          </body>
        </LocaleProvider>
      </DictionaryProvider>
    </html>
  );
}
