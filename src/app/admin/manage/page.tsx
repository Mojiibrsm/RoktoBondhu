// src/app/admin/manage/page.tsx
import { getDonors, updateUserRole } from '@/lib/actions';
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
import { Badge } from '@/components/ui/badge';
import { AdminRoleManager } from '@/components/admin-role-manager';

interface User {
  uid: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string; // Changed from Timestamp
}

export default async function AdminManagePage() {
  let users: User[] = [];
  let error: string | null = null;

  try {
    const donors = await getDonors();
    // The getDonors function already returns users. We can filter if needed, but for now, we'll show all.
    users = donors.map(d => ({
        uid: d.uid,
        name: d.name,
        email: d.email,
        role: d.role || 'user', // default to 'user' if role is not set
        createdAt: d.createdAt,
    }));
  } catch (e: any) {
    console.error("Error fetching users for admin management: ", e);
    error = "ব্যবহারকারীদের তালিকা লোড করতে ব্যর্থ হয়েছে।";
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
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString(
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
                  <AdminRoleManager user={user} updateUserRole={updateUserRole} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
