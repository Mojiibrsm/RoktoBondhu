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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, FileUp, Palette, Settings, Brush, Search as SearchIcon } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { handleUpdateSettings } from '@/lib/actions';

// This would typically come from a database
const currentSettings = {
    siteName: 'রক্তবন্ধু',
    tagline: 'রক্তদাতাদের সাথে ضرورتمندদের সংযোগ স্থাপন।',
    directorMessage: 'রক্তবন্ধু একটি অলাভজনক উদ্যোগ যা রক্তদাতা এবং গ্রহীতাদের মধ্যে একটি সেতুবন্ধন তৈরির লক্ষ্যে কাজ করে। প্রযুক্তি ব্যবহার করে জীবন বাঁচানোর এই যাত্রায় আমাদের সঙ্গী হওয়ার জন্য আপনাকে ধন্যবাদ।',
    directorName: 'মুজিবুর রহমান, প্রতিষ্ঠাতা',
    logo: '',
    primaryColor: '#A92116',
    metaTitle: 'রক্তবন্ধু - রক্ত দিন, জীবন বাঁচান',
    metaDescription: 'বাংলাদেশের সবচেয়ে বড় অনলাইন রক্তদাতা নেটওয়ার্ক। জরুরী রক্তের প্রয়োজনে ডোনার খুঁজুন বা রক্তদাতা হিসেবে নিবন্ধন করুন।',
};


const formSchema = z.object({
  siteName: z.string().min(1, { message: 'সাইটের নাম আবশ্যক।' }),
  tagline: z.string().min(1, { message: 'ট্যাগলাইন আবশ্যক।' }),
  logo: z.any().optional(),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, { message: 'সঠিক হেক্স কোড লিখুন (যেমন, #A92116)।' }),
  metaTitle: z.string().min(1, { message: 'মেটা টাইটেল আবশ্যক।' }),
  metaDescription: z.string().min(1, { message: 'মেটা বর্ণনা আবশ্যক।' }),
});


export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        siteName: currentSettings.siteName,
        tagline: currentSettings.tagline,
        logo: currentSettings.logo,
        primaryColor: currentSettings.primaryColor,
        metaTitle: currentSettings.metaTitle,
        metaDescription: currentSettings.metaDescription,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
        // We are not handling file upload here, so we remove the logo from the values
        const { logo, ...settingsToSave } = values;
        const result = await handleUpdateSettings(settingsToSave);
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
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">ওয়েবসাইট সেটিংস</CardTitle>
                    <CardDescription>
                    এখান থেকে ওয়েবসাইটের সাধারণ কনফিগারেশন, ব্র্যান্ডিং এবং SEO পরিচালনা করুন।
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl"><Settings className="w-5 h-5" />সাধারণ সেটিংস</CardTitle>
                </CardHeader>
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
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl"><Brush className="w-5 h-5" />ব্র্যান্ডিং ও থিম</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>লোগো আপলোড</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-4">
                                    <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center">
                                        <FileUp className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                    <Input type="file" onChange={(e) => field.onChange(e.target.files?.[0])} className="max-w-xs"/>
                                </div>
                            </FormControl>
                            <FormDescription>
                                সেরা ফলাফলের জন্য একটি স্বচ্ছ PNG ফাইল ব্যবহার করুন।
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="primaryColor"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>প্রাথমিক রঙ</FormLabel>
                            <FormControl>
                                <div className="flex items-center gap-2">
                                    <div style={{ backgroundColor: field.value }} className="w-10 h-10 rounded-md border" />
                                    <Input placeholder="#A92116" {...field} className="max-w-xs" />
                                </div>
                            </FormControl>
                             <FormDescription>
                                এটি আপনার সাইটের মূল থিম রঙ পরিবর্তন করবে।
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline text-xl"><SearchIcon className="w-5 h-5" />সার্চ ইঞ্জিন অপটিমাইজেশন (SEO)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>মেটা টাইটেল</FormLabel>
                        <FormControl>
                            <Input placeholder="রক্তবন্ধু - রক্ত দিন, জীবন বাঁচান" {...field} />
                        </FormControl>
                        <FormDescription>
                           ব্রাউজার ট্যাব এবং সার্চ ফলাফলে এই শিরোনাম প্রদর্শিত হবে।
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="metaDescription"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>মেটা বর্ণনা</FormLabel>
                        <FormControl>
                           <Textarea
                                placeholder="বাংলাদেশের সবচেয়ে বড় অনলাইন রক্তদাতা নেটওয়ার্ক।"
                                className="resize-y min-h-[100px]"
                                {...field}
                            />
                        </FormControl>
                        <FormDescription>
                            সার্চ ইঞ্জিন ফলাফলে আপনার সাইটের একটি সংক্ষিপ্ত সারসংক্ষেপ।
                        </FormDescription>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </CardContent>
            </Card>
            
            <div className="flex justify-end">
                <Button type="submit" disabled={loading} size="lg">
                {loading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Save className="mr-2 h-4 w-4" />
                )}
                {loading ? 'সংরক্ষণ করা হচ্ছে...' : 'সেটিংস সংরক্ষণ করুন'}
                </Button>
            </div>
        </form>
    </Form>
  );
}
