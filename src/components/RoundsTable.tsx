'use client';
import Link from 'next/link';
import { GameRound } from '@/lib/api';
import { useAppStore } from '@/lib/store';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useDictionary } from '@/context/DictionaryProvider';
import { useLocale } from '@/context/LocaleProvider';

interface RoundsTableProps {
  rounds: GameRound[];
  maxItems?: number;
  showAllColumns?: boolean;
}

export function RoundsTable({
  rounds,
  maxItems = 10,
  showAllColumns = false,
}: RoundsTableProps) {
  const { searchQuery } = useAppStore();
  const dict = useDictionary();
  const locale = useLocale();

  const filteredRounds = rounds
    .filter(
      round =>
        round.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        round.tableId.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, maxItems);

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{dict.roundId}</TableHead>
            <TableHead>{dict.tableId}</TableHead>
            {showAllColumns && (
              <>
                <TableHead>{dict.roundNumber}</TableHead>
                <TableHead>{dict.winner}</TableHead>
                <TableHead>{dict.bets}</TableHead>
                <TableHead>{dict.txHash}</TableHead>
                <TableHead>{dict.timestamp}</TableHead>
              </>
            )}
            <TableHead>{dict.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRounds.map(round => (
            <TableRow key={round.id}>
              <TableCell>{round.id}</TableCell>
              <TableCell>
                <Link
                  href={`${locale}/table/${round.tableId}`}
                  className="text-blue-500 hover:underline"
                >
                  {round.tableId}
                </Link>
              </TableCell>
              {showAllColumns && (
                <>
                  <TableCell>{round.roundNumber}</TableCell>
                  <TableCell>{round.winner}</TableCell>
                  <TableCell>{round.bets}</TableCell>
                  <TableCell>
                    <a
                      href={`https://etherscan.io/tx/${round.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {round.txHash}
                    </a>
                  </TableCell>
                  <TableCell>
                    {new Date(round.timestamp).toLocaleString()}
                  </TableCell>
                </>
              )}
              <TableCell>
                <Link
                  locale={locale}
                  href={`${locale}/round/${round.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {dict.viewDetails}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
