// src/app/admin/donors/page.tsx
'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, Timestamp } from 'firebase/firestore';
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
import { useToast } from '@/hooks/use-toast';
import { Loader2, Trash2, Edit, CheckCircle } from 'lucide-react';

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
  createdAt: Timestamp;
}

export default function AdminDonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'donors'), (snapshot) => {
      const donorsData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          uid: doc.id,
        } as Donor;
      });
      setDonors(donorsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching donors: ", error);
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "ডোনারদের তালিকা লোড করতে ব্যর্থ হয়েছে।",
      });
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const handleAction = (action: string, donorName: string) => {
    toast({
        title: "কার্যকলাপ প্রয়োজন",
        description: `"${donorName}" এর জন্য "${action}" ফাংশনটি এখনও প্রয়োগ করা হয়নি।`,
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
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
                    <Button variant="ghost" size="icon" onClick={() => handleAction('Verify', donor.name)}>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleAction('Edit', donor.name)}>
                        <Edit className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleAction('Delete', donor.name)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
