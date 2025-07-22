'use client';
import Link from "next/link";
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
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    email: z.string().email({ message: "সঠিক ইমেল ঠিকানা লিখুন।" }),
    password: z.string().min(1, { message: "পাসওয়ার্ড আবশ্যক।" }),
});

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login, user, userDoc } = useAuth();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const userCredential = await login(values.email, values.password);
            if(userCredential) {
              const idTokenResult = await userCredential.user.getIdTokenResult();
              const userRole = idTokenResult.claims.role;

              toast({
                  title: "সফল!",
                  description: "আপনি সফলভাবে লগইন করেছেন।",
              });

              if (userRole === 'admin') {
                  router.push("/admin");
              } else {
                  router.push("/profile");
              }
            }

        } catch (error: any) {
            console.error("Login failed", error);
             toast({
                variant: "destructive",
                title: "ত্রুটি!",
                description: "লগইন করতে ব্যর্থ। ইমেল বা পাসওয়ার্ড ভুল।",
            });
        } finally {
            setLoading(false);
        }
    }

    if (user && userDoc) {
      if (userDoc.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/profile');
      }
      return <div className="container py-12 md:py-16 text-center">লোড হচ্ছে...</div>;
    }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="mx-auto max-w-sm w-full shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary">লগইন</CardTitle>
          <CardDescription>
            আপনার অ্যাকাউন্টে লগইন করতে আপনার ইমেল ও পাসওয়ার্ড লিখুন
          </CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>ইমেল</FormLabel>
                            <FormControl>
                                <Input placeholder="m@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <div className="flex items-center">
                                <FormLabel>পাসওয়ার্ড</FormLabel>
                                <Link href="#" className="ml-auto inline-block text-sm underline">
                                    পাসওয়ার্ড ভুলে গেছেন?
                                </Link>
                            </div>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? 'লগইন হচ্ছে...' : 'লগইন'}
                    </Button>
                </form>
            </Form>
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
