import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="mx-auto max-w-sm w-full shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">লগইন</CardTitle>
          <CardDescription>
            আপনার অ্যাকাউন্টে লগইন করতে আপনার ইমেল লিখুন
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
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
              <div className="flex items-center">
                <Label htmlFor="password">পাসওয়ার্ড</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              লগইন
            </Button>
            <Button variant="outline" className="w-full">
              গুগল দিয়ে লগইন করুন
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            অ্যাকাউন্ট নেই?{" "}
            <Link href="/register" className="underline text-accent">
              নিবন্ধন করুন
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
