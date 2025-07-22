// src/app/admin/reports/page.tsx
import { getReports } from '@/lib/actions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Report {
  id: string;
  reportedBy: string;
  reportedUser: string;
  reason: string;
  status: 'পেন্ডিং' | 'সমাধান হয়েছে';
  date: string;
  type: string;
}

async function handleAction(formData: FormData) {
    'use server';
    const action = formData.get('action');
    const reportId = formData.get('reportId');
    console.log(`Action "${action}" triggered for report ID "${reportId}". Feature not yet implemented.`);
    // In a real app, you would implement the logic for take action, delete here.
}


export default async function AdminReportsPage() {
  let reports: Report[] = [];
  let error: string | null = null;

  try {
    reports = await getReports();
  } catch (e: any) {
    console.error("Error fetching reports: ", e);
    error = "রিপোর্ট তালিকা লোড করতে ব্যর্থ হয়েছে।";
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-destructive">ত্রুটি</CardTitle>
          <CardDescription>
            {error} অনুগ্রহ করে আবার চেষ্টা করুন।
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">রিপোর্ট ও অভিযোগ ম্যানেজমেন্ট</CardTitle>
        <CardDescription>
        ব্যবহারকারীদের রিপোর্ট দেখুন এবং প্রয়োজনীয় ব্যবস্থা নিন।
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>রিপোর্টের ধরণ</TableHead>
              <TableHead>বিস্তারিত</TableHead>
              <TableHead>রিপোর্টকারী</TableHead>
              <TableHead>অভিযুক্ত ব্যবহারকারী</TableHead>
              <TableHead>তারিখ</TableHead>
              <TableHead>স্ট্যাটাস</TableHead>
              <TableHead className="text-right">কার্যকলাপ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.type}</TableCell>
                <TableCell className="max-w-xs truncate">{report.reason}</TableCell>
                <TableCell>{report.reportedBy}</TableCell>
                <TableCell>{report.reportedUser}</TableCell>
                <TableCell>{format(new Date(report.date), "PPP")}</TableCell>
                <TableCell>
                  <Badge
                    variant={report.status === 'সমাধান হয়েছে' ? 'default' : 'destructive'}
                    className={
                      report.status === 'সমাধান হয়েছে' ? 'bg-green-600' : 'bg-yellow-600'
                    }
                  >
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end space-x-2">
                    <form action={handleAction}>
                      <input type="hidden" name="action" value="Take Action" />
                      <input type="hidden" name="reportId" value={report.id} />
                      <Button variant="ghost" size="icon" type="submit" title="ব্যবস্থা নিন">
                          <ShieldCheck className="h-4 w-4 text-green-600" />
                      </Button>
                    </form>
                    <form action={handleAction}>
                        <input type="hidden" name="action" value="Delete" />
                        <input type="hidden" name="reportId" value={report.id} />
                        <Button variant="ghost" size="icon" type="submit" title="মুছুন">
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
