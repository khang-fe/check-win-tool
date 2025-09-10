'use client';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { getRoundGrowthData } from '@/lib/api';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useDictionary } from '@/context/DictionaryProvider';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function RoundGrowthChart() {
  const dict = useDictionary();
  const [chartData, setChartData] = useState<{
    labels: string[];
    data: number[];
  }>({ labels: [], data: [] });

  useEffect(() => {
    getRoundGrowthData().then(data => setChartData(data));
  }, []);

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: dict.totalRounds,
        data: chartData.data,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const, labels: { color: '#1f2937' } },
      title: {
        display: true,
        text: dict.roundGrowthChartTitle,
        color: '#1f2937',
      },
    },
    scales: {
      x: {
        title: { display: true, text: dict.month, color: '#1f2937' },
        ticks: { color: '#1f2937' },
      },
      y: {
        title: { display: true, text: dict.rounds, color: '#1f2937' },
        ticks: { color: '#1f2937' },
        beginAtZero: true,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{dict.roundGrowthChartTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <Line data={data} options={options} />
      </CardContent>
    </Card>
  );
}
