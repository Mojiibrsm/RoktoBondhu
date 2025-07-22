// src/app/admin/dashboard/stats-cards.tsx
import { getDonors, getBloodRequests } from '@/lib/actions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Users, HeartHandshake, ShieldCheck, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

export default async function StatsCards() {
  let donors = [];
  let requests = [];
  let error = null;

  try {
    [donors, requests] = await Promise.all([getDonors(), getBloodRequests()]);
  } catch (e) {
    console.error('Failed to fetch stats data:', e);
    error = 'Could not load dashboard data.';
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive">{error}</p>
        </CardContent>
      </Card>
    );
  }

  const totalDonors = donors.length;
  const totalRequests = requests.length;
  const completedRequests = requests.filter(
    (req) => req.status === 'সম্পন্ন হয়েছে'
  ).length;
  const successPercentage =
    totalRequests > 0 ? (completedRequests / totalRequests) * 100 : 0;

  const locationCounts: { [key: string]: number } = {};
  requests.forEach((req) => {
    const location = req.district || 'Unknown';
    locationCounts[location] = (locationCounts[location] || 0) + 1;
  });

  const mostActiveLocation = Object.entries(locationCounts).sort(
    (a, b) => b[1] - a[1]
  )[0];

  const stats = [
    {
      title: 'মোট ডোনার',
      value: totalDonors.toLocaleString('bn-BD'),
      icon: Users,
      description: 'নিবন্ধিত মোট রক্তদাতার সংখ্যা',
    },
    {
      title: 'মোট অনুরোধ',
      value: totalRequests.toLocaleString('bn-BD'),
      icon: HeartHandshake,
      description: 'এখন পর্যন্ত আসা মোট রক্তের অনুরোধ',
    },
    {
      title: 'সফলতার হার',
      value: `${successPercentage.toFixed(1)}%`,
      icon: ShieldCheck,
      description: 'সম্পন্ন হওয়া অনুরোধের শতকরা হার',
    },
    {
      title: 'সবচেয়ে সক্রিয় এলাকা',
      value: mostActiveLocation ? mostActiveLocation[0] : 'N/A',
      icon: MapPin,
      description: `"${
        mostActiveLocation ? mostActiveLocation[1].toLocaleString('bn-BD') : 0
      }" টি অনুরোধ সহ`,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-sm hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium font-body">{stat.title}</CardTitle>
            <stat.icon className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-headline">{stat.value}</div>
            <p className="text-xs text-muted-foreground pt-1">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
