import 'server-only';

export type Locale = 'en' | 'vi';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then(m => m.default),
  vi: () => import('../dictionaries/vi.json').then(m => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
