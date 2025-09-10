'use client';
import Link from 'next/link';
import { GameTable } from '@/lib/api';
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

interface TableCompProps {
  tables: GameTable[];
  maxItems?: number;
  showAllColumns?: boolean;
}

export function TableComp({
  tables,
  maxItems = 5,
  showAllColumns = false,
}: TableCompProps) {
  const dict = useDictionary();
  const { searchQuery } = useAppStore();
  const locale = useLocale();

  const filteredTables = tables
    .filter(
      table =>
        table.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        table.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(0, maxItems);

  return (
    <div className="rounded-md border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{dict.tableId}</TableHead>
            <TableHead>{dict.tableName}</TableHead>
            {showAllColumns && (
              <>
                <TableHead>{dict.status}</TableHead>
                <TableHead>{dict.players}</TableHead>
                <TableHead>{dict.totalRounds}</TableHead>
                <TableHead>{dict.lastActivity}</TableHead>
                <TableHead>{dict.txHash}</TableHead>
              </>
            )}
            <TableHead>{dict.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTables.map(table => (
            <TableRow key={table.id}>
              <TableCell>{table.id}</TableCell>
              <TableCell>{table.name}</TableCell>
              {showAllColumns && (
                <>
                  <TableCell>{table.status}</TableCell>
                  <TableCell>{table.players}</TableCell>
                  <TableCell>{table.totalRounds}</TableCell>
                  <TableCell>
                    {new Date(table.lastActivity).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`https://etherscan.io/tx/${table.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {table.txHash}
                    </a>
                  </TableCell>
                </>
              )}
              <TableCell>
                <Link
                  locale={locale}
                  href={`${locale}/table/${table.id}`}
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
