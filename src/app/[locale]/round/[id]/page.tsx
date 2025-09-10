import Link from 'next/link';
import { getRoundById, getRounds } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getDictionary } from '@/lib/get-dictionary';

export async function generateStaticParams() {
  const rounds = await getRounds();
  return rounds.map(round => ({ id: round.id }));
}

export default async function RoundDetail({
  params,
}: {
  params: { id: string; locale };
}) {
  const dict = await getDictionary(params.locale);
  const round = await getRoundById(params.id);

  if (!round) {
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
              {dict.roundId} {round.id}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link
              href={`/${params.locale}`}
              as={`/${params.locale}/rounds`}
              className="mb-4 inline-block text-blue-500 hover:underline"
            >
              {dict.backToHome}
            </Link>
            <p className="mb-2">
              <strong>{dict.tableId}:</strong>{' '}
              <Link
                href={`/${params.locale}/table/${round.tableId}`}
                className="text-blue-500 hover:underline"
              >
                {round.tableId}
              </Link>
            </p>
            <p className="mb-2">
              <strong>{dict.roundNumber}:</strong> {round.roundNumber}
            </p>
            <p className="mb-2">
              <strong>{dict.winner}:</strong> {round.winner}
            </p>
            <p className="mb-2">
              <strong>{dict.bets}:</strong> {round.bets}
            </p>
            <p className="mb-2">
              <strong>{dict.txHash}:</strong>{' '}
              <a
                href={`https://etherscan.io/tx/${round.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {round.txHash}
              </a>
            </p>
            <p>
              <strong>{dict.timestamp}:</strong>{' '}
              {new Date(round.timestamp).toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
