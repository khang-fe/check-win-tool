import { Button } from '@/components/ui/button';
import { SearchBar } from '@/components/SearchBar';
import { StatsCards } from '@/components/StatsCards';
import { TableComp } from '@/components/TableComp';
import { RoundsTable } from '@/components/RoundsTable';
import { UserGrowthChart } from '@/components/UserGrowthChart';
import { RoundGrowthChart } from '@/components/RoundGrowthChart';
import Link from 'next/link';
import { getTables, getRounds } from '@/lib/api';
import { getDictionary, Locale } from '@/lib/get-dictionary';
import { Header } from '@/components/Header';

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dict = await getDictionary(locale);

  const tables = await getTables();
  const rounds = await getRounds();

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <p className="mb-8 text-center text-gray-600">
            {dict.checkActivities}
          </p>
          <SearchBar />
          <StatsCards />
          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <UserGrowthChart />
            <RoundGrowthChart />
          </div>
          <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
            <div className="flex w-full max-w-6xl flex-col gap-4">
              <TableComp tables={tables} maxItems={10} />
              <Link href={`${locale}/tables`} className="w-full">
                <Button variant="outline" className="w-full">
                  {dict.viewAllTables}
                </Button>
              </Link>
            </div>
            <div className="flex w-full max-w-6xl flex-col gap-4">
              <RoundsTable rounds={rounds} maxItems={10} />
              <Link href={`${locale}/rounds`} className="w-full">
                <Button variant="outline" className="w-full">
                  {dict.viewAllRounds}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
