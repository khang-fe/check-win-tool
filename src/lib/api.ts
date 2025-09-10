export interface GameTable {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  players: number;
  totalRounds: number;
  lastActivity: string;
  txHash: string;
}

export interface GameRound {
  id: string;
  tableId: string;
  roundNumber: number;
  winner: string;
  bets: number;
  txHash: string;
  timestamp: string;
}

// Fake data (tạm thời)
const fakeTables: GameTable[] = Array.from({ length: 20 }, (_, i) => ({
  id: `0xtable${(i + 1).toString().padStart(2, '0')}`,
  name: `Table ${i + 1}`,
  status: i % 2 === 0 ? 'active' : 'inactive',
  players: Math.floor(Math.random() * 10) + 1,
  totalRounds: Math.floor(Math.random() * 100),
  lastActivity: new Date(
    2025,
    8,
    8,
    12,
    0,
    0,
    -i * 24 * 60 * 60 * 1000
  ).toISOString(),
  txHash: `0xtableTx${(i + 1).toString().padStart(2, '0')}...`,
}));

const fakeRounds: GameRound[] = Array.from({ length: 50 }, (_, i) => ({
  id: `0xround${(i + 1).toString().padStart(4, '0')}`,
  tableId: fakeTables[Math.floor(Math.random() * fakeTables.length)].id,
  roundNumber: Math.floor(Math.random() * 30) + 1,
  winner: `0xPlayer${String.fromCharCode(65 + (i % 6))}`,
  bets: Number((Math.random() * 2).toFixed(2)),
  txHash: `0xroundTx${(i + 1).toString().padStart(4, '0')}...`,
  timestamp: new Date(2025, 8, 8, 12, 0, 0, -i * 3600 * 1000).toISOString(),
})).sort(
  (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
);

export async function getTables(): Promise<GameTable[]> {
  // Sau này: return fetch('/api/tables').then(res => res.json());
  return Promise.resolve(fakeTables);
}

export async function getRounds(): Promise<GameRound[]> {
  // Sau này: return fetch('/api/rounds').then(res => res.json());
  return Promise.resolve(fakeRounds);
}

export async function getTableById(id: string): Promise<GameTable | null> {
  // Sau này: return fetch(`/api/tables/${id}`).then(res => res.json());
  return Promise.resolve(fakeTables.find(table => table.id === id) || null);
}

export async function getRoundById(id: string): Promise<GameRound | null> {
  // Sau này: return fetch(`/api/rounds/${id}`).then(res => res.json());
  return Promise.resolve(fakeRounds.find(round => round.id === id) || null);
}

export async function getUserGrowthData(): Promise<{
  labels: string[];
  data: number[];
}> {
  // Sau này: return fetch('/api/user-growth').then(res => res.json());
  return Promise.resolve({
    labels: [
      '2024-10',
      '2024-11',
      '2024-12',
      '2025-01',
      '2025-02',
      '2025-03',
      '2025-04',
      '2025-05',
      '2025-06',
      '2025-07',
      '2025-08',
      '2025-09',
    ],
    data: [100, 200, 350, 500, 650, 800, 950, 1100, 1200, 1300, 1400, 1500],
  });
}

export async function getRoundGrowthData(): Promise<{
  labels: string[];
  data: number[];
}> {
  // Sau này: return fetch('/api/round-growth').then(res => res.json());
  return Promise.resolve({
    labels: [
      '2024-10',
      '2024-11',
      '2024-12',
      '2025-01',
      '2025-02',
      '2025-03',
      '2025-04',
      '2025-05',
      '2025-06',
      '2025-07',
      '2025-08',
      '2025-09',
    ],
    data: [2, 5, 10, 15, 20, 25, 30, 35, 40, 45, 48, 50],
  });
}
