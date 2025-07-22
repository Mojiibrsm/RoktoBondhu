// src/app/admin/dashboard/analytics-overview.tsx
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const chartData = [
  { month: 'জানুয়ারি', requests: 186, donations: 80 },
  { month: 'ফেব্রুয়ারি', requests: 305, donations: 200 },
  { month: 'মার্চ', requests: 237, donations: 120 },
  { month: 'এপ্রিল', requests: 73, donations: 190 },
  { month: 'মে', requests: 209, donations: 130 },
  { month: 'জুন', requests: 214, donations: 140 },
];

const chartConfig = {
  requests: {
    label: 'অনুরোধ',
    color: 'hsl(var(--chart-1))',
  },
  donations: {
    label: 'সফল দান',
    color: 'hsl(var(--chart-2))',
  },
};

export default function AnalyticsOverview() {
    const [loading, setLoading] = useState(true);

    // Simulate loading for better UX
    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);


    if (loading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-7 w-48" />
                    <Skeleton className="h-4 w-full max-w-sm" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[350px] w-full" />
                </CardContent>
            </Card>
        )
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">মাসিক পরিসংখ্যান</CardTitle>
        <CardDescription>বিগত ৬ মাসের অনুরোধ এবং সফল দানের চিত্র</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <Tooltip cursor={false} content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="requests" fill="var(--color-requests)" radius={4} />
              <Bar dataKey="donations" fill="var(--color-donations)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
