'use client';

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
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
import { User, Droplet, MapPin, Edit, HeartHandshake, Loader2 } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
    const { user, userDoc, loading } = useAuth();
    const router = useRouter();
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        division: '',
        district: '',
        upazila: '',
        lastDonation: '',
        available: true,
    });

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
        if(userDoc) {
            setFormData({
                name: userDoc.name || '',
                phone: userDoc.phone || '',
                division: userDoc.division || '',
                district: userDoc.district || '',
                upazila: userDoc.upazila || '',
                lastDonation: userDoc.lastDonation?.toDate ? userDoc.lastDonation.toDate().toISOString().split('T')[0] : '',
                available: userDoc.available || false,
            })
        }
    }, [user, userDoc, loading, router]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

     const handleSelectChange = (id: string, value: string) => {
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSwitchChange = (checked: boolean) => {
        setFormData(prev => ({ ...prev, available: checked }));
    };

    const handleSaveChanges = async () => {
        if (!user) return;
        setIsSaving(true);
        try {
            const userRef = doc(db, 'donors', user.uid);
            await updateDoc(userRef, {
                name: formData.name,
                phone: formData.phone,
                division: formData.division,
                district: formData.district,
                upazila: formData.upazila,
                lastDonation: formData.lastDonation ? new Date(formData.lastDonation) : null,
                available: formData.available,
            });
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
    }


    if (loading || !userDoc) {
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
            <div className="lg:col-span-1">
                <Card className="shadow-lg sticky top-24">
                    <CardHeader className="items-center text-center">
                        <User className="w-20 h-20 text-primary mb-4" />
                        <CardTitle className="font-headline text-3xl">{userDoc.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-3">
                        <div className="flex items-center justify-center gap-2">
                            <Droplet className="w-5 h-5 text-primary" />
                            <span className="text-lg font-bold">{userDoc.bloodType}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <MapPin className="w-5 h-5" />
                            <span>{userDoc.upazila}, {userDoc.district}</span>
                        </div>
                         <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <HeartHandshake className="w-5 h-5 text-primary" />
                            <span>মোট রক্তদান: {userDoc.totalDonations || 0} বার</span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Separator />
                        <div className="flex items-center justify-between w-full pt-4">
                            <Label htmlFor="availability-status" className="font-semibold">দানের জন্য উপলব্ধ?</Label>
                            <Switch id="availability-status" checked={formData.available} onCheckedChange={handleSwitchChange} />
                        </div>
                    </CardFooter>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <Edit className="w-6 h-6" /> আপনার তথ্য সম্পাদনা করুন
                        </CardTitle>
                        <CardDescription>আপনার বিবরণ আপ-টু-ডেট রাখুন যাতে আমরা ضرورتمندদের সাথে সংযুক্ত করতে পারি।</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">পুরো নাম</Label>
                            <Input id="name" value={formData.name} onChange={handleInputChange} />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="email">ইমেল ঠিকানা</Label>
                            <Input id="email" type="email" value={user.email || ''} disabled />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">ফোন নম্বর</Label>
                            <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastDonation">শেষ দানের তারিখ</Label>
                            <Input id="lastDonation" type="date" value={formData.lastDonation} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="division">বিভাগ</Label>
                          <Select value={formData.division} onValueChange={(value) => handleSelectChange('division', value)}>
                            <SelectTrigger id="division"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Dhaka">ঢাকা</SelectItem>
                                <SelectItem value="Chittagong">চট্টগ্রাম</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="district">জেলা</Label>
                            <Input id="district" value={formData.district} onChange={handleInputChange} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="upazila">উপজেলা / এলাকা</Label>
                            <Input id="upazila" value={formData.upazila} onChange={handleInputChange} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full md:w-auto ml-auto bg-primary hover:bg-primary/90" onClick={handleSaveChanges} disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {isSaving ? 'সংরক্ষণ করা হচ্ছে...' : 'পরিবর্তনগুলি সংরক্ষণ করুন'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  );
}
