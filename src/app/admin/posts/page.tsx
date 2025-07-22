// src/app/admin/posts/page.tsx
import { getBlogPosts } from '@/lib/actions';
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
import { Trash2, Edit, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  slug: string;
}

// This is a server component, so we can't use hooks like useToast directly.
// We'll add a simple placeholder for actions for now.
async function handleAction(formData: FormData) {
    'use server';
    const action = formData.get('action');
    const postId = formData.get('postId');
    console.log(`Action "${action}" triggered for post ID "${postId}". Feature not yet implemented.`);
    // In a real app, you would implement the logic for edit, delete here.
}

export default async function AdminPostsPage() {
  let posts: BlogPost[] = [];
  let error: string | null = null;

  try {
    posts = await getBlogPosts();
  } catch (e: any) {
    console.error("Error fetching blog posts: ", e);
    error = "ব্লগ পোস্টের তালিকা লোড করতে ব্যর্থ হয়েছে।";
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
            <CardTitle className="font-headline text-3xl">ব্লগ পোস্ট ম্যানেজমেন্ট</CardTitle>
            <CardDescription>
            ব্লগ পোস্ট দেখুন, সম্পাদনা করুন বা মুছুন।
            </CardDescription>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> নতুন পোস্ট যোগ করুন
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>শিরোনাম</TableHead>
              <TableHead>লেখক</TableHead>
              <TableHead>প্রকাশের তারিখ</TableHead>
              <TableHead>লিঙ্ক</TableHead>
              <TableHead className="text-right">কার্যকলাপ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-medium">{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>{format(new Date(post.date), "PPP")}</TableCell>
                <TableCell>
                    <Button asChild variant="link" className="p-0 h-auto">
                        <Link href={`/blog/${post.slug}`} target="_blank">
                           /blog/{post.slug}
                        </Link>
                    </Button>
                </TableCell>
                <TableCell className="text-right flex items-center justify-end space-x-2">
                     <form action={handleAction}>
                        <input type="hidden" name="action" value="Edit" />
                        <input type="hidden" name="postId" value={post.id} />
                        <Button variant="ghost" size="icon" type="submit">
                            <Edit className="h-4 w-4 text-blue-600" />
                        </Button>
                    </form>
                    <form action={handleAction}>
                        <input type="hidden" name="action" value="Delete" />
                        <input type="hidden" name="postId" value={post.id} />
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
