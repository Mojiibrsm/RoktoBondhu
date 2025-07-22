// src/components/admin-role-manager.tsx
'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { startTransition } from 'react';

interface User {
  uid: string;
  role: 'user' | 'admin';
}

interface AdminRoleManagerProps {
  user: User;
  updateUserRole: (uid: string, role: 'user' | 'admin') => Promise<{ success: boolean; message: string }>;
}

export function AdminRoleManager({ user, updateUserRole }: AdminRoleManagerProps) {
  const { user: currentUser } = useAuth();
  const { toast } = useToast();

  const handleRoleChange = async (newRole: 'user' | 'admin') => {
    if (user.uid === currentUser?.uid) {
      toast({
        variant: 'destructive',
        title: 'ত্রুটি',
        description: 'আপনি নিজের ভূমিকা পরিবর্তন করতে পারবেন না।',
      });
      return;
    }

    startTransition(async () => {
        try {
            const result = await updateUserRole(user.uid, newRole);
            if (result.success) {
                toast({
                title: 'সফল!',
                description: `ব্যবহারকারীর ভূমিকা সফলভাবে ${
                    newRole === 'admin' ? 'অ্যাডমিন' : 'ব্যবহারকারী'
                } করা হয়েছে।`,
                });
                // Note: We might need to use revalidatePath from next/navigation
                // if we want to see the change instantly without a page reload.
                // For now, a manual refresh will show the updated role.
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
    });
  };

  return (
    <Select
      defaultValue={user.role}
      onValueChange={(value: 'user' | 'admin') => handleRoleChange(value)}
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
  );
}
