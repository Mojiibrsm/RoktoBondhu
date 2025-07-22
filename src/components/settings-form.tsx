// src/components/settings-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
import { Loader2, Save, FileUp, Settings, Brush, Search as SearchIcon, HeartHandshake } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import type { SettingsData } from '@/app/admin/settings/page';


const settingsSchema = z.object({
  siteName: z.string().min(1, { message: 'সাইটের নাম আবশ্যক।' }),
  tagline: z.string().min(1, { message: 'ট্যাগলাইন আবশ্যক।' }),
  logo: z.any().optional(),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, { message: 'সঠিক হেক্স কোড লিখুন (যেমন, #A92116)।' }),
  metaTitle: z.string().min(1, { message: 'মেটা টাইটেল আবশ্যক।' }),
  metaDescription: z.string().min(1, { message: 'মেটা বর্ণনা আবশ্যক।' }),
  minimumAge: z.coerce.number().min(16, { message: 'বয়স কমপক্ষে ১৬ হতে হবে।' }),
  donationGap: z.coerce.number().min(30, { message: 'ব্যবধান কমপক্ষে ৩০ দিন হতে হবে।' }),
  bloodTypes: z.string().min(1, { message: 'রক্তের গ্রুপের তালিকা আবশ্যক।' }),
  eligibilityRules: z.string().min(1, { message: 'যোগ্যতার নিয়মাবলী আবশ্যক।' }),
});


interface SettingsFormProps {
    currentSettings: SettingsData;
    handleUpdateSettings: (values: SettingsData) => Promise<{ success: boolean, message: string }>;
}

export function SettingsForm({ currentSettings, handleUpdateSettings }: SettingsFormProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
        ...currentSettings,
        logo: undefined, // Logo is not part of the data model being saved
    },
  });

  async function onSubmit(values: z.infer<typeof settingsSchema>) {
    setLoading(true);
    try {
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
                    <CardTitle className="flex items-center gap-2 font-headline text-xl"><HeartHandshake className="w-5 h-5" />রক্তদান সম্পর্কিত সেটিংস</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <FormField
                            control={form.control}
                            name="minimumAge"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ন্যূনতম বয়সসীমা</FormLabel>
                                    <FormControl><Input type="number" placeholder="18" {...field} /></FormControl>
                                    <FormDescription>রক্তদাতাদের জন্য সর্বনিম্ন বয়স।</FormDescription>
                                    <FormMessage />
                                </FormItem>
                        )}/>
                        <FormField
                            control={form.control}
                            name="donationGap"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>দান করার ব্যবধান (দিন)</FormLabel>
                                    <FormControl><Input type="number" placeholder="90" {...field} /></FormControl>
                                    <FormDescription>একবার রক্তদানের পর কতদিন অপেক্ষা করতে হবে।</FormDescription>
                                    <FormMessage />
                                </FormItem>
                        )}/>
                    </div>
                    <FormField
                        control={form.control}
                        name="bloodTypes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>রক্তের গ্রুপের তালিকা</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="A+, A-, B+, B-, O+, O-, AB+, AB-" {...field} />
                                </FormControl>
                                <FormDescription>কমা (,) দিয়ে আলাদা করে রক্তের গ্রুপগুলো লিখুন।</FormDescription>
                                <FormMessage />
                            </FormItem>
                    )}/>
                    <FormField
                        control={form.control}
                        name="eligibilityRules"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>যোগ্যতার নিয়মাবলী সম্পাদক</FormLabel>
                                <FormControl>
                                    <Textarea className="min-h-[150px]" placeholder="রক্তদানের জন্য যোগ্যতার নিয়মাবলী লিখুন..." {...field} />
                                </FormControl>
                                <FormDescription>এই নিয়মগুলো সাধারণ জিজ্ঞাসা (FAQ) বা যোগ্যতার পৃষ্ঠায় দেখানো যেতে পারে।</FormDescription>
                                <FormMessage />
                            </FormItem>
                    )}/>
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
