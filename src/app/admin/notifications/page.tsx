// src/app/admin/notifications/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { sendNotificationOnServer, getDonors } from '@/lib/actions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SendNotificationInputSchema, SendNotificationInput } from '@/ai/schemas/notifications';
import { upazilas } from '@/lib/placeholder-data';

interface Donor {
    uid: string;
    name: string;
    email: string;
}

const allUpazilas = Object.values(upazilas).flat().filter((v, i, a) => a.indexOf(v) === i).sort();


export default function AdminNotificationsPage() {
  const [loading, setLoading] = useState(false);
  const [donors, setDonors] = useState<Donor[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchDonors() {
        try {
            const donorData = await getDonors();
            setDonors(donorData);
        } catch (error) {
            console.error("Failed to fetch donors", error);
            toast({
                variant: "destructive",
                title: "ত্রুটি",
                description: "ব্যবহারকারীদের তালিকা আনতে ব্যর্থ হয়েছে।"
            })
        }
    }
    fetchDonors();
  }, [toast]);

  const form = useForm<SendNotificationInput>({
    resolver: zodResolver(SendNotificationInputSchema),
    defaultValues: {
      channel: 'email',
      targetType: 'all',
      targetValue: '',
      message: '',
    },
  });

  const targetType = form.watch('targetType');

  async function onSubmit(values: SendNotificationInput) {
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                name="targetType"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>টার্গেট</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="টার্গেট নির্বাচন করুন" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="all">সকল ব্যবহারকারী</SelectItem>
                                            <SelectItem value="bloodGroup">রক্তের গ্রুপ অনুযায়ী</SelectItem>
                                            <SelectItem value="location">এলাকা অনুযায়ী</SelectItem>
                                            <SelectItem value="user">নির্দিষ্ট ব্যবহারকারী অনুযায়ী</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </div>

                            {targetType === 'bloodGroup' && (
                                <FormField
                                control={form.control}
                                name="targetValue"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>রক্তের গ্রুপ</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="রক্তের গ্রুপ নির্বাচন করুন" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="A+">A+</SelectItem>
                                            <SelectItem value="A-">A-</SelectItem>
                                            <SelectItem value="B+">B+</SelectItem>
                                            <SelectItem value="B-">B-</SelectItem>
                                            <SelectItem value="O+">O+</SelectItem>
                                            <SelectItem value="O-">O-</SelectItem>
                                            <SelectItem value="AB+">AB+</SelectItem>
                                            <SelectItem value="AB-">AB-</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            )}
                            {targetType === 'location' && (
                                <FormField
                                control={form.control}
                                name="targetValue"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>এলাকা</FormLabel>
                                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {allUpazilas.map(upazila => (
                                                <SelectItem key={upazila} value={upazila}>{upazila}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            )}
                            {targetType === 'user' && (
                                <FormField
                                control={form.control}
                                name="targetValue"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>ব্যবহারকারী</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="ব্যবহারকারী নির্বাচন করুন" />
                                        </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {donors.length === 0 && <p className="p-2 text-sm text-muted-foreground">ব্যবহারকারী লোড হচ্ছে...</p>}
                                            {donors.map(donor => (
                                                <SelectItem key={donor.uid} value={donor.uid}>{donor.name} ({donor.email})</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}
                                />
                            )}

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
                        <CardFooter>
                            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
                            {loading ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Send className="mr-2 h-4 w-4" />
                            )}
                            {loading ? 'পাঠানো হচ্ছে...' : 'এখনই পাঠান'}
                            </Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    </div>
  );
}
