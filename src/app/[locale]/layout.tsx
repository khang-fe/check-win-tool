import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DictionaryProvider } from '@/context/DictionaryProvider';
import { getDictionary } from '@/lib/get-dictionary';
import { LocaleProvider } from '@/context/LocaleProvider';

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
    <html lang={locale}>
      <DictionaryProvider dict={dict}>
        <LocaleProvider locale={locale as 'en' | 'vi'}>
          <body className={inter.className}>{children}</body>
        </LocaleProvider>
      </DictionaryProvider>
    </html>
  );
}
