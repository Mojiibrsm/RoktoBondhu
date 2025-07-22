// src/app/register/page.tsx
'use client';

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { divisions, districts, upazilas } from "@/lib/placeholder-data";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";


const formSchema = z.object({
  fullName: z.string().min(1, { message: "পুরো নাম আবশ্যক।" }),
  email: z.string().email({ message: "সঠিক ইমেল ঠিকানা লিখুন।" }),
  phoneNumber: z.string().min(1, { message: "ফোন নম্বর আবশ্যক।" }),
  password: z.string().min(6, { message: "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।" }),
  dateOfBirth: z.date({ required_error: "জন্ম তারিখ আবশ্যক।" }),
  gender: z.string({ required_error: "লিঙ্গ নির্বাচন করুন।" }),
  bloodType: z.string({ required_error: "রক্তের গ্রুপ নির্বাচন করুন।" }),
  lastDonationDate: z.date().optional(),
  totalDonations: z.coerce.number().min(0, {message: "অনুগ্রহ করে একটি সঠিক সংখ্যা লিখুন।"}).optional(),
  division: z.string({ required_error: "বিভাগ নির্বাচন করুন।" }),
  district: z.string({ required_error: "জেলা নির্বাচন করুন।" }),
  upazila: z.string({ required_error: "উপজেলা নির্বাচন করুন।" }),
  availableToDonate: z.boolean().default(true),
});

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();
    const { signup } = useAuth();
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phoneNumber: "",
            password: "",
            availableToDonate: true,
            totalDonations: 0,
        },
    });

    const currentDivision = form.watch("division");
    const currentDistrict = form.watch("district");

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            await signup(values.email, values.password, {
                name: values.fullName,
                email: values.email,
                phone: values.phoneNumber,
                dateOfBirth: values.dateOfBirth,
                gender: values.gender,
                bloodType: values.bloodType,
                lastDonation: values.lastDonationDate,
                totalDonations: values.totalDonations,
                division: values.division,
                district: values.district,
                upazila: values.upazila,
                available: values.availableToDonate,
                createdAt: new Date(),
                role: 'user' // Default role
            });
            toast({
                title: "সফল!",
                description: "আপনার নিবন্ধন সফলভাবে সম্পন্ন হয়েছে। প্রোফাইলে আপনাকে রিডাইরেক্ট করা হচ্ছে।",
            });
            router.push("/profile");
        } catch (e: any) {
            console.error("Error adding document: ", e);
            toast({
                variant: "destructive",
                title: "ত্রুটি!",
                description: e.message || "নিবন্ধন সম্পন্ন করা যায়নি। অনুগ্রহ করে আবার চেষ্টা করুন।",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
    <div className="flex items-center justify-center py-12 px-4">
        <Card className="mx-auto max-w-3xl w-full shadow-xl">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-headline text-primary">একজন দাতা হন</CardTitle>
                <CardDescription>
                একটি অ্যাকাউন্ট তৈরি করতে আপনার তথ্য লিখুন
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground/80 border-b pb-2">ব্যক্তিগত তথ্য</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField control={form.control} name="fullName" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>পুরো নাম</FormLabel>
                                        <FormControl><Input placeholder="আপনার পুরো নাম" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="email" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ইমেল</FormLabel>
                                        <FormControl><Input type="email" placeholder="m@example.com" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>ফোন নম্বর</FormLabel>
                                        <FormControl><Input type="tel" placeholder="+৮৮০১২৩৪৫৬৭৮৯" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="password" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>পাসওয়ার্ড</FormLabel>
                                        <FormControl><Input type="password" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="dateOfBirth" render={({ field }) => (
                                     <FormItem className="flex flex-col">
                                     <FormLabel>জন্ম তারিখ</FormLabel>
                                     <Popover>
                                         <PopoverTrigger asChild>
                                         <FormControl>
                                             <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                             {field.value ? format(field.value, "PPP") : (<span>একটি তারিখ বাছুন</span>)}
                                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                             </Button>
                                         </FormControl>
                                         </PopoverTrigger>
                                         <PopoverContent className="w-auto p-0" align="start">
                                         <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                                         </PopoverContent>
                                     </Popover>
                                     <FormMessage />
                                     </FormItem>
                                )}/>
                                <FormField control={form.control} name="gender" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>লিঙ্গ</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl><SelectTrigger><SelectValue placeholder="লিঙ্গ নির্বাচন করুন" /></SelectTrigger></FormControl>
                                            <SelectContent>
                                                <SelectItem value="male">পুরুষ</SelectItem>
                                                <SelectItem value="female">মহিলা</SelectItem>
                                                <SelectItem value="other">অন্যান্য</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground/80 border-b pb-2">রক্তদান সংক্রান্ত তথ্য</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField control={form.control} name="bloodType" render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>রক্তের গ্রুপ</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="রক্তের গ্রুপ নির্বাচন করুন" /></SelectTrigger></FormControl>
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
                                )}/>
                                <FormField control={form.control} name="lastDonationDate" render={({ field }) => (
                                    <FormItem className="flex flex-col">
                                    <FormLabel>শেষ রক্তদানের তারিখ (ঐচ্ছিক)</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                            {field.value ? format(field.value, "PPP") : (<span>একটি তারিখ বাছুন</span>)}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="totalDonations" render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>মোট রক্তদান (ঐচ্ছিক)</FormLabel>
                                        <FormControl><Input type="number" placeholder="যেমন, ৫" {...field} /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}/>
                            </div>
                        </div>

                        <div className="space-y-4">
                             <h3 className="text-lg font-semibold text-foreground/80 border-b pb-2">ঠিকানা</h3>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <FormField control={form.control} name="division" render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>বিভাগ</FormLabel>
                                    <Select onValueChange={(value) => { field.onChange(value); form.setValue('district', ''); form.setValue('upazila', ''); }} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="বিভাগ নির্বাচন করুন" /></SelectTrigger></FormControl>
                                        <SelectContent>{divisions.map(d => <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>)}</SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="district" render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>জেলা</FormLabel>
                                    <Select onValueChange={(value) => { field.onChange(value); form.setValue('upazila', ''); }} value={field.value || ''} disabled={!currentDivision}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="জেলা নির্বাচন করুন" /></SelectTrigger></FormControl>
                                        <SelectContent>{currentDivision && districts[currentDivision] && districts[currentDivision].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}/>
                                <FormField control={form.control} name="upazila" render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>উপজেলা / এলাকা</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value || ''} disabled={!currentDistrict}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="উপজেলা নির্বাচন করুন" /></SelectTrigger></FormControl>
                                        <SelectContent>{currentDistrict && upazilas[currentDistrict] && upazilas[currentDistrict].map(u => <SelectItem key={u} value={u}>{u}</SelectItem>)}</SelectContent>
                                    </Select>
                                    <FormMessage />
                                    </FormItem>
                                )}/>
                            </div>
                        </div>

                        <FormField control={form.control} name="availableToDonate" render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>এখন দান করতে ইচ্ছুক?</FormLabel>
                                <FormDescription>জরুরী প্রয়োজনে আপনার সাথে যোগাযোগ করা হতে পারে।</FormDescription>
                            </div>
                            </FormItem>
                        )}/>

                        <div className="space-y-4 pt-4">
                             <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg" disabled={loading}>
                                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {loading ? 'প্রসেস হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="mt-6 text-center text-sm">
                    ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{' '}
                    <Link href="/login" className="underline text-accent font-semibold">
                        এখানে সাইন ইন করুন
                    </Link>
                </div>
            </CardContent>
        </Card>
    </div>
    );
}
