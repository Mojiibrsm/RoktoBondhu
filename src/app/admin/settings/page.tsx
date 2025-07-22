// src/app/admin/settings/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { handleUpdateSettings } from '@/lib/actions';

// This would typically come from a database
const currentSettings = {
    siteName: 'রক্তবন্ধু',
    tagline: 'রক্তদাতাদের সাথে ضرورتمندদের সংযোগ স্থাপন।',
    directorMessage: 'রক্তবন্ধু একটি অলাভজনক উদ্যোগ যা রক্তদাতা এবং গ্রহীতাদের মধ্যে একটি সেতুবন্ধন তৈরির লক্ষ্যে কাজ করে। প্রযুক্তি ব্যবহার করে জীবন বাঁচানোর এই যাত্রায় আমাদের সঙ্গী হওয়ার জন্য আপনাকে ধন্যবাদ।',
    directorName: 'মুজিবুর রহমান, প্রতিষ্ঠাতা',
};


const formSchema = z.object({
  siteName: z.string().min(1, { message: 'সাইটের নাম আবশ্যক।' }),
  tagline: z.string().min(1, { message: 'ট্যাগলাইন আবশ্যক।' }),
  directorMessage: z.string().min(10, { message: 'বার্তাটি কমপক্ষে ১০ অক্ষরের হতে হবে।' }),
    directorName: z.string().min(1, { message: 'পরিচালকের নাম আবশ্যক।' }),
});


export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        siteName: currentSettings.siteName,
        tagline: currentSettings.tagline,
        directorMessage: currentSettings.directorMessage,
        directorName: currentSettings.directorName,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
        const result = await handleUpdateSettings(values);
        if (result.success) {
            toast({
                title: 'সফল!',
                description: result.message,
            });
        } else {
            throw new Error(result.message);
        }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'ত্রুটি',
        description: error.message || 'সেটিংস আপডেট করা যায়নি।',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">ওয়েবসাইট সেটিংস</CardTitle>
        <CardDescription>
          এখান থেকে ওয়েবসাইটের সাধারণ কনফিগারেশন পরিচালনা করুন।
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="siteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>সাইটের নাম</FormLabel>
                  <FormControl>
                    <Input placeholder="রক্তবন্ধু" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tagline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>সাইটের ট্যাগলাইন</FormLabel>
                  <FormControl>
                    <Input placeholder="জীবন বাঁচানোর জন্য একটি সম্প্রদায়" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="directorMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>পরিচালকের বার্তা</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="আপনার বার্তা এখানে লিখুন..."
                      className="resize-y min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="directorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>পরিচালকের নাম ও পদবি</FormLabel>
                  <FormControl>
                    <Input placeholder="নাম, পদবি" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading} className="ml-auto">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {loading ? 'সংরক্ষণ করা হচ্ছে...' : 'সেটিংস সংরক্ষণ করুন'}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
