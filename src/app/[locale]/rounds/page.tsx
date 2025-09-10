import { RoundsTable } from '@/components/RoundsTable';
import { getRounds } from '@/lib/api';

export default async function RoundsPage() {
  const rounds = await getRounds();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <RoundsTable rounds={rounds} maxItems={10} showAllColumns />
      </div>
    </div>
  );
}
