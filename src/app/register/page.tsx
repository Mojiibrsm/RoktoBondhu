import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
        <Card className="mx-auto max-w-sm w-full shadow-xl">
        <CardHeader>
            <CardTitle className="text-3xl font-headline text-primary">একজন দাতা হন</CardTitle>
            <CardDescription>
            একটি অ্যাকাউন্ট তৈরি করতে আপনার তথ্য লিখুন
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="full-name">পুরো নাম</Label>
                <Input id="full-name" placeholder="ম্যাক্স রবিনসন" required />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="email">ইমেল</Label>
                <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="blood-type">রক্তের গ্রুপ</Label>
                <Select>
                  <SelectTrigger id="blood-type">
                    <SelectValue placeholder="আপনার রক্তের গ্রুপ নির্বাচন করুন" />
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
            <div className="grid gap-2">
                <Label htmlFor="password">পাসওয়ার্ড</Label>
                <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                অ্যাকাউন্ট তৈরি করুন
            </Button>
            <Button variant="outline" className="w-full">
                গুগল দিয়ে সাইন আপ করুন
            </Button>
            </div>
            <div className="mt-4 text-center text-sm">
            ইতিমধ্যে একটি অ্যাকাউন্ট আছে?{" "}
            <Link href="/login" className="underline text-accent">
                সাইন ইন করুন
            </Link>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
