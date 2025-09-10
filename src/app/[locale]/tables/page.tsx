import { TableComp } from '@/components/TableComp';
import { getTables } from '@/lib/api';

export default async function TablesPage() {
  const tables = await getTables();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <TableComp tables={tables} maxItems={10} showAllColumns />
      </div>
    </div>
  );
}
