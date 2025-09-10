'use client';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { useEffect } from 'react';
import { useDictionary } from '@/context/DictionaryProvider';

export function SearchBar() {
  const dict = useDictionary();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { searchQuery, setSearchQuery } = useAppStore();

  useEffect(() => {
    const query = searchParams.get('search') || '';
    setSearchQuery(query);
  }, [searchParams, setSearchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('search', query);
    } else {
      params.delete('search');
    }
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="mb-8">
      <Input
        type="text"
        placeholder={dict.searchPlaceholder}
        value={searchQuery}
        onChange={handleSearch}
        className="mx-auto max-w-md"
      />
    </div>
  );
}
