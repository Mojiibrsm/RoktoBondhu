// src/app/profile/page.tsx
'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Droplet, MapPin, Edit, HeartHandshake, Loader2, Shield, Bell, Settings, Lock, Trash2, Camera } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const profileSchema = z.object({
    name: z.string().min(1, "নাম আবশ্যক।"),
    phone: z.string().min(1, "ফোন নম্বর আবশ্যক।"),
    division: z.string().min(1, "বিভাগ আবশ্যক।"),
    district: z.string().min(1, "জেলা আবশ্যক।"),
    upazila: z.string().min(1, "উপজেলা আবশ্যক।"),
    lastDonation: z.string().optional(),
    available: z.boolean(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
    const { user, loading, logout, reloadUser } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [isSaving, setIsSaving] = useState(false);

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: '',
            phone: '',
            division: '',
            district: '',
            upazila: '',
            lastDonation: '',
            available: true,
        },
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (user) {
            form.reset({
                name: user.name || '',
                phone: user.phone || '',
                division: user.division || '',
                district: user.district || '',
                upazila: user.upazila || '',
                lastDonation: user.lastDonation?.toDate ? user.lastDonation.toDate().toISOString().split('T')[0] : '',
                available: user.available ?? true,
            });
        }
    }, [user, loading, router, form]);

    const handleProfileUpdate = async (data: ProfileFormData) => {
        if (!user) return;
        setIsSaving(true);
        try {
            const userRef = doc(db, 'donors', user.uid);
            await updateDoc(userRef, {
                ...data,
                lastDonation: data.lastDonation ? new Date(data.lastDonation) : null,
            });
            await reloadUser();
            toast({
                title: "সফল!",
                description: "আপনার প্রোফাইল সফলভাবে আপডেট করা হয়েছে।",
            });
        } catch (error) {
            console.error("Error updating profile:", error);
            toast({
                variant: "destructive",
                title: "ত্রুটি",
                description: "প্রোফাইল আপডেট করার সময় একটি সমস্যা হয়েছে।"
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }

  return (
    <div className="container py-12 md:py-16">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">আমার প্রোফাইল</h1>
            <p className="text-lg md:text-xl text-foreground/80 mt-4 max-w-3xl mx-auto">
                আপনার ব্যক্তিগত তথ্য এবং দানের প্রাপ্যতা পরিচালনা করুন।
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-8">
                <Card className="shadow-lg sticky top-24">
                    <CardHeader className="items-center text-center">
                        <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                            <AvatarImage src={user.image} alt={user.name} data-ai-hint="profile picture" />
                            <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="font-headline text-3xl">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-3">
                        <div className="flex items-center justify-center gap-2">
                            <Droplet className="w-5 h-5 text-primary" />
                            <span className="text-lg font-bold">{user.bloodType}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <MapPin className="w-5 h-5" />
                            <span>{user.upazila}, {user.district}</span>
                        </div>
                         <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <HeartHandshake className="w-5 h-5 text-primary" />
                            <span>মোট রক্তদান: {user.totalDonations || 0} বার</span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Separator />
                        <form onSubmit={form.handleSubmit(handleProfileUpdate)} className="w-full">
                            <div className="flex items-center justify-between w-full py-4">
                                <Label htmlFor="availability-status" className="font-semibold text-base">দানের জন্য উপলব্ধ?</Label>
                                <Controller
                                    name="available"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Switch
                                            id="availability-status"
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                field.onChange(checked);
                                                // Automatically submit on change
                                                form.handleSubmit(handleProfileUpdate)();
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </form>
                    </CardFooter>
                </Card>
                 <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2 text-xl"><Lock /> অ্যাকাউন্ট সেটিংস</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="change-password">পাসওয়ার্ড পরিবর্তন করুন</Label>
                            <Input id="change-password" type="password" placeholder="নতুন পাসওয়ার্ড" />
                        </div>
                        <Button variant="outline" className="w-full">পাসওয়ার্ড আপডেট করুন</Button>
                        <Separator />
                        <Button variant="destructive" className="w-full"><Trash2 /> অ্যাকাউন্ট মুছুন</Button>
                    </CardContent>
                </Card>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2 space-y-8">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2 text-xl"><Edit /> আপনার তথ্য সম্পাদনা করুন</CardTitle>
                        <CardDescription>আপনার বিবরণ আপ-টু-ডেট রাখুন।</CardDescription>
                    </CardHeader>
                    <form onSubmit={form.handleSubmit(handleProfileUpdate)}>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="name">পুরো নাম</Label>
                                <Input id="name" {...form.register("name")} />
                                {form.formState.errors.name && <p className="text-destructive text-sm">{form.formState.errors.name.message}</p>}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="email">ইমেল ঠিকানা</Label>
                                <Input id="email" type="email" value={user.email || ''} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">ফোন নম্বর</Label>
                                <Input id="phone" type="tel" {...form.register("phone")} />
                                {form.formState.errors.phone && <p className="text-destructive text-sm">{form.formState.errors.phone.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="blood-group">রক্তের গ্রুপ</Label>
                                <Input id="blood-group" value={user.bloodType} disabled />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastDonation">শেষ দানের তারিখ</Label>
                                <Input id="lastDonation" type="date" {...form.register("lastDonation")} />
                            </div>
                             <div className="space-y-2">
                              <Label htmlFor="division">বিভাগ</Label>
                              <Controller name="division" control={form.control} render={({ field }) => (
                                 <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger id="division"><SelectValue placeholder="বিভাগ নির্বাচন করুন" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="ঢাকা">ঢাকা</SelectItem>
                                        <SelectItem value="চট্টগ্রাম">চট্টগ্রাম</SelectItem>
                                        <SelectItem value="রাজশাহী">রাজশাহী</SelectItem>
                                        <SelectItem value="খুলনা">খুলনা</SelectItem>
                                        <SelectItem value="বরিশাল">বরিশাল</SelectItem>
                                        <SelectItem value="সিলেট">সিলেট</SelectItem>
                                        <SelectItem value="রংপুর">রংপুর</SelectItem>
                                        <SelectItem value="ময়মনসিংহ">ময়মনসিংহ</SelectItem>
                                    </SelectContent>
                                </Select>
                              )} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="district">জেলা</Label>
                                <Input id="district" {...form.register("district")} />
                                 {form.formState.errors.district && <p className="text-destructive text-sm">{form.formState.errors.district.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="upazila">উপজেলা / এলাকা</Label>
                                <Input id="upazila" {...form.register("upazila")} />
                                {form.formState.errors.upazila && <p className="text-destructive text-sm">{form.formState.errors.upazila.message}</p>}
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="profile-photo">প্রোফাইল ছবি</Label>
                                <div className="flex items-center gap-4">
                                    <Button type="button" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                                        <Camera className="mr-2" /> ছবি পরিবর্তন করুন
                                    </Button>
                                    <Input id="file-upload" type="file" className="hidden" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full md:w-auto ml-auto bg-primary hover:bg-primary/90" disabled={isSaving}>
                                {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {isSaving ? 'সংরক্ষণ করা হচ্ছে...' : 'পরিবর্তনগুলি সংরক্ষণ করুন'}
                            </Button>
                        </CardFooter>
                    </form>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2 text-xl"><Bell /> নোটিফিকেশন</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="blood-needed-notif" className="flex-1">রক্তের প্রয়োজনে নোটিফিকেশন</Label>
                                <Switch id="blood-needed-notif" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="email-notif" className="flex-1">ইমেল নোটিফিকেশন</Label>
                                <Switch id="email-notif" />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="sms-notif" className="flex-1">এসএমএস অ্যালার্ট</Label>
                                <Switch id="sms-notif" />
                            </div>
                        </CardContent>
                    </Card>
                     <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle className="font-headline flex items-center gap-2 text-xl"><Shield /> প্রাইভেসি</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="contact-info">যোগাযোগের তথ্য দেখান:</Label>
                                <Select defaultValue="verified">
                                    <SelectTrigger id="contact-info">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="verified">শুধুমাত্র যাচাইকৃত ব্যবহারকারীদের</SelectItem>
                                        <SelectItem value="all">সবাইকে</SelectItem>
                                        <SelectItem value="none">কাউকে না</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="profile-visibility">প্রোফাইল দৃশ্যমানতা:</Label>
                                <Select defaultValue="public">
                                    <SelectTrigger id="profile-visibility">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="public">পাবলিক</SelectItem>
                                        <SelectItem value="admin">শুধু অ্যাডমিন</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    </div>
  );
}
