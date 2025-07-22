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
import { User, Droplet, MapPin, Edit, HeartHandshake } from "lucide-react";

const donorProfile = {
    name: 'জান্নাতুল ফেরদৌস',
    email: 'jannatul@example.com',
    phone: '+৮৮০১৭২৩৪৫৬৭৮',
    bloodType: 'O+',
    division: 'চট্টগ্রাম',
    district: 'চট্টগ্রাম',
    upazila: 'পাঁচলাইশ',
    lastDonation: '2024-05-10',
    available: true,
    totalDonations: 12
};

export default function ProfilePage() {
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
                        <CardTitle className="font-headline text-3xl">{donorProfile.name}</CardTitle>
                        <CardDescription>{donorProfile.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="text-center space-y-3">
                        <div className="flex items-center justify-center gap-2">
                            <Droplet className="w-5 h-5 text-primary" />
                            <span className="text-lg font-bold">{donorProfile.bloodType}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <MapPin className="w-5 h-5" />
                            <span>{donorProfile.upazila}, {donorProfile.district}</span>
                        </div>
                         <div className="flex items-center justify-center gap-2 text-muted-foreground">
                            <HeartHandshake className="w-5 h-5 text-primary" />
                            <span>মোট রক্তদান: {donorProfile.totalDonations} বার</span>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Separator />
                        <div className="flex items-center justify-between w-full pt-4">
                            <Label htmlFor="availability-status" className="font-semibold">দানের জন্য উপলব্ধ?</Label>
                            <Switch id="availability-status" checked={donorProfile.available} />
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
                            <Input id="name" defaultValue={donorProfile.name} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">ইমেল ঠিকানা</Label>
                            <Input id="email" type="email" defaultValue={donorProfile.email} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">ফোন নম্বর</Label>
                            <Input id="phone" type="tel" defaultValue={donorProfile.phone} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="last-donation">শেষ দানের তারিখ</Label>
                            <Input id="last-donation" type="date" defaultValue={donorProfile.lastDonation} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="division">বিভাগ</Label>
                          <Select defaultValue={donorProfile.division}>
                            <SelectTrigger id="division"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Dhaka">ঢাকা</SelectItem>
                                <SelectItem value="Chittagong">চট্টগ্রাম</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="district">জেলা</Label>
                            <Input id="district" defaultValue={donorProfile.district} />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="upazila">উপজেলা / এলাকা</Label>
                            <Input id="upazila" defaultValue={donorProfile.upazila} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full md:w-auto ml-auto bg-primary hover:bg-primary/90">পরিবর্তনগুলি সংরক্ষণ করুন</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    </div>
  );
}
