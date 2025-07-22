// src/app/admin/requests/page.tsx
import { getBloodRequests } from '@/lib/actions';
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
import { Trash2, Edit, CheckCircle, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';

interface BloodRequest {
  id: string;
  patientName: string;
  bloodType: string;
  location: string;
  division: string;
  district: string;
  upazila: string;
  status: 'জরুরী' | 'সক্রিয়';
  postedTime: string;
  reason: string;
}

// This is a server component, so we can't use hooks like useToast directly.
// We'll add a simple placeholder for actions for now.
async function handleAction(formData: FormData) {
    'use server';
    const action = formData.get('action');
    const requestId = formData.get('requestId');
    console.log(`Action "${action}" triggered for request ID "${requestId}". Feature not yet implemented.`);
    // In a real app, you would implement the logic for approve, edit, delete here.
}


export default async function AdminRequestsPage() {
  let requests: BloodRequest[] = [];
  let error: string | null = null;

  try {
    requests = await getBloodRequests();
  } catch (e: any) {
    console.error("Error fetching blood requests: ", e);
    error = "রক্তের অনুরোধের তালিকা লোড করতে ব্যর্থ হয়েছে।";
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
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="font-headline text-3xl">রক্তের অনুরোধ ম্যানেজমেন্ট</CardTitle>
            <CardDescription>
            সক্রিয় অনুরোধগুলো দেখুন, অনুমোদন করুন, সম্পাদনা করুন বা মুছুন।
            </CardDescription>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> নতুন অনুরোধ যোগ করুন
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>রোগীর নাম</TableHead>
              <TableHead>রক্তের গ্রুপ</TableHead>
              <TableHead>অবস্থান</TableHead>
              <TableHead>পোস্টের সময়</TableHead>
              <TableHead>স্ট্যাটাস</TableHead>
              <TableHead className="text-right">কার্যকলাপ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request.id}>
                <TableCell className="font-medium">{request.patientName}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{request.bloodType}</Badge>
                </TableCell>
                <TableCell>{`${request.upazila}, ${request.district}`}</TableCell>
                <TableCell>{format(new Date(request.postedTime), "PPp")}</TableCell>
                <TableCell>
                  <Badge
                    variant={request.status === 'জরুরী' ? 'destructive' : 'default'}
                    className={
                      request.status === 'জরুরী' ? 'bg-primary' : ''
                    }
                  >
                    {request.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end space-x-2">
                    <form action={handleAction}>
                      <input type="hidden" name="action" value="Approve" />
                      <input type="hidden" name="requestId" value={request.id} />
                      <Button variant="ghost" size="icon" type="submit">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                      </Button>
                    </form>
                     <form action={handleAction}>
                        <input type="hidden" name="action" value="Edit" />
                        <input type="hidden" name="requestId" value={request.id} />
                        <Button variant="ghost" size="icon" type="submit">
                            <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                    </form>
                    <form action={handleAction}>
                        <input type="hidden" name="action" value="Delete" />
                        <input type="hidden" name="requestId" value={request.id} />
                        <Button variant="ghost" size="icon" type="submit">
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