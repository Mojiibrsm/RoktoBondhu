// src/app/admin/notifications/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { sendNotificationOnServer } from '@/lib/actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const formSchema = z.object({
  channel: z.enum(['email', 'sms']),
  target: z.string().min(1, { message: 'অনুগ্রহ করে একটি টার্গেট নির্দিষ্ট করুন।' }),
  message: z.string().min(10, {
    message: 'বার্তাটি কমপক্ষে ১০ অক্ষরের হতে হবে।',
  }),
});

export default function AdminNotificationsPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      channel: 'email',
      target: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const response = await sendNotificationOnServer(values);
      toast({
        title: "সফল!",
        description: response.status,
      });
      form.reset();
    } catch (e) {
      toast({
        variant: "destructive",
        title: "ত্রুটি",
        description: "নোটিফিকেশন পাঠাতে একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।",
      });
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-12 md:py-16">
        <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">নোটিফিকেশন পাঠান</CardTitle>
                <CardDescription>ব্যবহারকারীদের কাছে জরুরি রক্তের অনুরোধ বা অন্যান্য বার্তা পাঠান।</CardDescription>
            </CardHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardContent className="space-y-4">
                    <FormField
                    control={form.control}
                    name="channel"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>চ্যানেল</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="চ্যানেল নির্বাচন করুন" />
                            </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                            <SelectItem value="email">ইমেল</SelectItem>
                            <SelectItem value="sms">এসএমএস</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="target"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>টার্গেট</FormLabel>
                        <FormControl>
                            <Input
                            placeholder="যেমন, ঢাকা, O+"
                            {...field}
                            />
                        </FormControl>
                         <p className="text-sm text-muted-foreground">কাদের কাছে পাঠাতে চান তা নির্দিষ্ট করুন (যেমন, এলাকা, রক্তের গ্রুপ)।</p>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>বার্তা</FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder="যেমন, ঢাকায় জরুরি ভিত্তিতে O+ রক্তের প্রয়োজন।"
                            className="resize-y min-h-[120px]"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
                <CardContent>
                    <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                    {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                        <Send className="mr-2 h-4 w-4" />
                    )}
                    {loading ? 'পাঠানো হচ্ছে...' : 'এখনই পাঠান'}
                    </Button>
                </CardContent>
                </form>
            </Form>
            </Card>
        </div>
    </div>
  );
}
