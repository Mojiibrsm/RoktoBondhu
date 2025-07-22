// src/app/admin/manage/page.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { updateUserRole } from '@/lib/actions';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface User {
  uid: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: Timestamp;
}

export default function AdminManagePage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'donors'), (snapshot) => {
      const usersData = snapshot.docs.map(
        (doc) =>
          ({
            uid: doc.id,
            ...doc.data(),
          } as User)
      );
      setUsers(usersData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleRoleChange = async (uid: string, newRole: 'user' | 'admin') => {
    if (uid === currentUser?.uid) {
      toast({
        variant: 'destructive',
        title: 'ত্রুটি',
        description: 'আপনি নিজের ভূমিকা পরিবর্তন করতে পারবেন না।',
      });
      return;
    }

    try {
      const result = await updateUserRole(uid, newRole);
      if (result.success) {
        toast({
          title: 'সফল!',
          description: `ব্যবহারকারীর ভূমিকা সফলভাবে ${
            newRole === 'admin' ? 'অ্যাডমিন' : 'ব্যবহারকারী'
          } করা হয়েছে।`,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'ভূমিকা পরিবর্তনে ত্রুটি',
        description: error.message,
      });
    }
  };

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
        <CardTitle className="font-headline text-3xl">
          অ্যাডমিন ম্যানেজমেন্ট
        </CardTitle>
        <CardDescription>
          ব্যবহারকারীদের ভূমিকা দেখুন এবং পরিবর্তন করুন।
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>নাম</TableHead>
              <TableHead>ইমেল</TableHead>
              <TableHead>যোগদানের তারিখ</TableHead>
              <TableHead>ভূমিকা</TableHead>
              <TableHead className="text-right">ভূমিকা পরিবর্তন করুন</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.uid}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.createdAt?.toDate
                    ? new Date(user.createdAt.toDate()).toLocaleDateString(
                        'bn-BD'
                      )
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === 'admin' ? 'default' : 'secondary'}
                    className={
                      user.role === 'admin' ? 'bg-primary' : ''
                    }
                  >
                    {user.role === 'admin' ? 'অ্যাডমিন' : 'ব্যবহারকারী'}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Select
                    defaultValue={user.role}
                    onValueChange={(value: 'user' | 'admin') =>
                      handleRoleChange(user.uid, value)
                    }
                    disabled={user.uid === currentUser?.uid}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="ভূমিকা বাছুন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">ব্যবহারকারী</SelectItem>
                      <SelectItem value="admin">অ্যাডমিন</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
