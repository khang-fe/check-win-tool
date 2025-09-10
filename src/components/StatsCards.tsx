'use client';
import { getTables, getRounds } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDictionary } from '@/context/DictionaryProvider';

export function StatsCards() {
  const dict = useDictionary();

  const [stats, setStats] = useState({
    totalTables: 0,
    totalRounds: 0,
    totalUsers: 1500,
  });

  useEffect(() => {
    Promise.all([getTables(), getRounds()]).then(([tables, rounds]) => {
      setStats({
        totalTables: tables.length,
        totalRounds: rounds.length,
        totalUsers: 1500, // Tạm thời hardcode
      });
    });
  }, []);

  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>{dict.totalTables}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.totalTables}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{dict.totalRounds}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.totalRounds}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>{dict.totalUsers}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </CardContent>
      </Card>
    </div>
  );
}
