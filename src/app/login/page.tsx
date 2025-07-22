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
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
    email: z.string().email({ message: "সঠিক ইমেল ঠিকানা লিখুন।" }),
    password: z.string().min(1, { message: "পাসওয়ার্ড আবশ্যক।" }),
    remember: z.boolean().default(false),
});

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { login, user } = useAuth();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    useEffect(() => {
      if (user) {
        if (user.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/profile');
        }
      }
    }, [user, router]);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setLoading(true);
        try {
            const loggedInUser = await login(values.email, values.password, values.remember);
            
            if (loggedInUser) {
              toast({
                  title: "সফল!",
                  description: "আপনি সফলভাবে লগইন করেছেন।",
              });

              // Redirection is now handled by the useEffect hook
            } else {
                 throw new Error("Invalid credentials");
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

    if (user) {
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
                             <FormLabel>পাসওয়ার্ড</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-between">
                         <FormField
                            control={form.control}
                            name="remember"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm font-normal">
                                        আমাকে মনে রাখুন
                                    </FormLabel>
                                </div>
                                </FormItem>
                            )}
                        />
                         <Link href="#" className="ml-auto inline-block text-sm underline">
                            পাসওয়ার্ড ভুলে গেছেন?
                        </Link>
                    </div>

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
