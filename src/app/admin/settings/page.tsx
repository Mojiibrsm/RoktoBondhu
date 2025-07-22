// src/app/admin/settings/page.tsx
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getSettings, handleUpdateSettings } from '@/lib/actions';
import { SettingsForm } from '@/components/settings-form';
import { Settings, Brush, Search as SearchIcon, HeartHandshake } from 'lucide-react';


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

export type SettingsData = z.infer<typeof settingsSchema>;

export default async function AdminSettingsPage() {
    const currentSettings = await getSettings();

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-3xl">ওয়েবসাইট সেটিংস</CardTitle>
                    <CardDescription>
                        এখান থেকে ওয়েবসাইটের সাধারণ কনফিগারেশন, ব্র্যান্ডিং এবং SEO পরিচালনা করুন।
                    </CardDescription>
                </CardHeader>
            </Card>

            <SettingsForm currentSettings={currentSettings} handleUpdateSettings={handleUpdateSettings} />

        </div>
    );
}
