'use client';
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplet, MapPin, Search, UserCheck, UserX } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

interface Donor {
    id: string;
    name: string;
    bloodType: string;
    division: string;
    district: string;
    upazila: string;
    available: boolean;
}

export default function DonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "donors"), (snapshot) => {
        const donorsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donor));
        setDonors(donorsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">একজন জীবনরক্ষাকারী খুঁজুন</h1>
        <p className="text-lg md:text-xl text-foreground/80 mt-4 max-w-3xl mx-auto">
        আমাদের প্ল্যাটফর্মে আপনি সহজেই আপনার এলাকার রক্তদাতাদের খুঁজে পেতে পারেন। বিভাগ, জেলা এবং উপজেলা অনুযায়ী অনুসন্ধান করে আপনার নিকটবর্তী ডোনারদের সাথে দ্রুত যোগাযোগ স্থাপন করুন।
        </p>
      </div>

      <Card className="mb-8 shadow-lg">
        <CardContent className="p-6">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <label htmlFor="blood-type" className="font-medium">রক্তের গ্রুপ</label>
              <Select>
                <SelectTrigger id="blood-type">
                  <SelectValue placeholder="যেকোনো" />
                </SelectTrigger>
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
            </div>
            <div className="space-y-2">
              <label htmlFor="division" className="font-medium">বিভাগ</label>
              <Select>
                <SelectTrigger id="division">
                  <SelectValue placeholder="যেকোনো" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dhaka">ঢাকা</SelectItem>
                  <SelectItem value="Chittagong">চট্টগ্রাম</SelectItem>
                  <SelectItem value="Rajshahi">রাজশাহী</SelectItem>
                  <SelectItem value="Khulna">খুলনা</SelectItem>
                  <SelectItem value="Sylhet">সিলেট</SelectItem>
                  <SelectItem value="Barisal">বরিশাল</SelectItem>
                  <SelectItem value="Rangpur">রংপুর</SelectItem>
                  <SelectItem value="Mymensingh">ময়মনসিংহ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="district" className="font-medium">জেলা</label>
              <Select>
                <SelectTrigger id="district">
                  <SelectValue placeholder="যেকোনো" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dhaka">ঢাকা</SelectItem>
                  <SelectItem value="Chittagong">চট্টগ্রাম</SelectItem>
                  <SelectItem value="Gazipur">গাজীপুর</SelectItem>
                  <SelectItem value="Narayanganj">নারায়ণগঞ্জ</SelectItem>
                  <SelectItem value="Sylhet">সিলেট</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="upazila" className="font-medium">উপজেলা / এলাকা</label>
               <Select>
                <SelectTrigger id="upazila">
                  <SelectValue placeholder="যেকোনো" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gulshan">গুলশান</SelectItem>
                  <SelectItem value="Dhanmondi">ধানমন্ডি</SelectItem>
                  <SelectItem value="Panchlaish">পাঁচলাইশ</SelectItem>
                  <SelectItem value="Sreepur">শ্রীপুর</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full lg:w-auto bg-primary hover:bg-primary/90">
              <Search className="mr-2 h-4 w-4" /> অনুসন্ধান
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {donors.map((donor) => (
          <Card key={donor.id} className="flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="font-headline text-2xl">{donor.name}</span>
                <Badge className="bg-primary text-primary-foreground">{donor.bloodType}</Badge>
              </CardTitle>
              <CardDescription className="flex items-center pt-2">
                <MapPin className="mr-2 h-4 w-4" />
                {donor.upazila}, {donor.district}, {donor.division}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-4">
               <Separator />
                {donor.available ? (
                    <Badge variant="outline" className="text-green-600 border-green-600 w-full justify-center py-2">
                        <UserCheck className="mr-2 h-4 w-4" /> দানের জন্য উপলব্ধ
                    </Badge>
                ) : (
                    <Badge variant="outline" className="text-red-600 border-red-600 w-full justify-center py-2">
                        <UserX className="mr-2 h-4 w-4" /> উপলব্ধ নয়
                    </Badge>
                )}
              <Button className="w-full bg-accent hover:bg-accent/90">প্রোফাইল দেখুন ও যোগাযোগ করুন</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
