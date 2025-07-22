// src/app/admin/feedback/page.tsx
import { getFeedback } from '@/lib/actions';
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
import { MailCheck, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

interface Feedback {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'নতুন' | 'পঠিত';
  date: string;
}

async function handleAction(formData: FormData) {
    'use server';
    const action = formData.get('action');
    const feedbackId = formData.get('feedbackId');
    console.log(`Action "${action}" triggered for feedback ID "${feedbackId}". Feature not yet implemented.`);
    // In a real app, you would implement the logic for marking as read or deleting here.
}

export default async function AdminFeedbackPage() {
  let feedbackList: Feedback[] = [];
  let error: string | null = null;

  try {
    feedbackList = await getFeedback();
  } catch (e: any) {
    console.error("Error fetching feedback: ", e);
    error = "ফিডব্যাক তালিকা লোড করতে ব্যর্থ হয়েছে।";
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
        <CardTitle className="font-headline text-3xl">ব্যবহারকারীর ফিডব্যাক</CardTitle>
        <CardDescription>
        ব্যবহারকারীদের মতামত দেখুন এবং উত্তর দিন।
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>নাম</TableHead>
              <TableHead>ইমেল</TableHead>
              <TableHead>বার্তা</TableHead>
              <TableHead>তারিখ</TableHead>
              <TableHead>স্ট্যাটাস</TableHead>
              <TableHead className="text-right">কার্যকলাপ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbackList.map((feedback) => (
              <TableRow key={feedback.id}>
                <TableCell className="font-medium">{feedback.name}</TableCell>
                <TableCell>{feedback.email}</TableCell>
                <TableCell className="max-w-md truncate">{feedback.message}</TableCell>
                <TableCell>{format(new Date(feedback.date), "PPP")}</TableCell>
                <TableCell>
                  <Badge
                    variant={feedback.status === 'পঠিত' ? 'default' : 'secondary'}
                    className={
                      feedback.status === 'পঠিত' ? 'bg-green-600' : 'bg-blue-600'
                    }
                  >
                    {feedback.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end space-x-2">
                    <form action={handleAction}>
                      <input type="hidden" name="action" value="Mark as Read" />
                      <input type="hidden" name="feedbackId" value={feedback.id} />
                      <Button variant="ghost" size="icon" type="submit" title="পঠিত হিসাবে চিহ্নিত করুন">
                          <MailCheck className="h-4 w-4 text-green-600" />
                      </Button>
                    </form>
                    <form action={handleAction}>
                        <input type="hidden" name="action" value="Delete" />
                        <input type="hidden" name="feedbackId" value={feedback.id} />
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
