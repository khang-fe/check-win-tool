import Link from 'next/link';
import { getTableById } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDictionary, Locale } from '@/lib/get-dictionary';

export default async function TableDetail({
  params,
}: {
  params: { id: string; locale: Locale };
}) {
  const dict = await getDictionary(params.locale);
  const table = await getTableById(params.id);

  if (!table) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 text-center">
        <p className="text-gray-600">{dict.noData}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>
              {dict.tableId} {table.id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href={'/'}
              as={`/${params.locale}/tables`}
              className="mb-4 inline-block text-blue-500 hover:underline"
            >
              {dict.backToHome}
            </Link>
            <p className="mb-2">
              <strong>{dict.name}:</strong> {table.name}
            </p>
            <p className="mb-2">
              <strong>{dict.status}:</strong> {table.status}
            </p>
            <p className="mb-2">
              <strong>{dict.players}:</strong> {table.players}
            </p>
            <p className="mb-2">
              <strong>{dict.totalRounds}:</strong> {table.totalRounds}
            </p>
            <p className="mb-2">
              <strong>{dict.lastActivity}:</strong>{' '}
              {new Date(table.lastActivity).toLocaleString()}
            </p>
            <p>
              <strong>{dict.txHash}:</strong>{' '}
              <a
                href={`https://etherscan.io/tx/${table.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {table.txHash}
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
