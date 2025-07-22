// src/app/admin/donors/page.tsx
import { getDonors } from '@/lib/actions';
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
import { Trash2, Edit, CheckCircle } from 'lucide-react';

interface Donor {
  uid: string;
  name: string;
  email: string;
  bloodType: string;
  division: string;
  district: string;
  upazila: string;
  available: boolean;
  totalDonations: number;
  createdAt: string;
}

// This is a server component, so we can't use hooks like useToast directly.
// We'll add a simple placeholder for actions for now.
async function handleAction(action: string, donorName: string) {
    'use server';
    console.log(`Action "${action}" triggered for donor "${donorName}". Feature not yet implemented.`);
    // In a real app, you would implement the logic for verify, edit, delete here.
}


export default async function AdminDonorsPage() {
  let donors: Donor[] = [];
  let error: string | null = null;

  try {
    donors = await getDonors();
  } catch (e: any) {
    console.error("Error fetching donors: ", e);
    error = "ডোনারদের তালিকা লোড করতে ব্যর্থ হয়েছে।";
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
        <CardTitle className="font-headline text-3xl">ডোনার ম্যানেজমেন্ট</CardTitle>
        <CardDescription>
          ডোনারদের তথ্য দেখুন, যাচাই করুন, সম্পাদনা করুন বা মুছুন।
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>নাম</TableHead>
              <TableHead>ইমেল</TableHead>
              <TableHead>রক্তের গ্রুপ</TableHead>
              <TableHead>অবস্থান</TableHead>
              <TableHead>অবস্থা</TableHead>
              <TableHead className="text-right">কার্যকলাপ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {donors.map((donor) => (
              <TableRow key={donor.uid}>
                <TableCell className="font-medium">{donor.name}</TableCell>
                <TableCell>{donor.email}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{donor.bloodType}</Badge>
                </TableCell>
                <TableCell>{`${donor.upazila}, ${donor.district}`}</TableCell>
                <TableCell>
                  <Badge
                    variant={donor.available ? 'default' : 'destructive'}
                    className={
                      donor.available ? 'bg-green-600' : 'bg-red-600'
                    }
                  >
                    {donor.available ? 'উপলব্ধ' : 'অনুপলব্ধ'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right space-x-2">
                    <form action={async () => { await handleAction('Verify', donor.name)}}>
                      <Button variant="ghost" size="icon" type="submit">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                      </Button>
                    </form>
                     <form action={async () => { await handleAction('Edit', donor.name)}}>
                        <Button variant="ghost" size="icon" type="submit">
                            <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                    </form>
                    <form action={async () => { await handleAction('Delete', donor.name)}}>
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
