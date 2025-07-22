// src/app/admin/data/page.tsx
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    DatabaseZap,
    FileLock,
    FileDown,
    DatabaseBackup,
    Download
  } from "lucide-react"
import Link from "next/link";
  
  const dataFeatures = [
    {
      title: "Seed Database",
      description: "ডাটাবেস এ ডেমো ডেটা যোগ করুন। এটি নতুন ডেটা দিয়ে কালেকশনগুলো পূরণ করবে।",
      icon: DatabaseZap,
      href: "/admin/seed",
    },
    {
        title: "Firestore Rules",
        description: "আপনার Firestore ডাটাবেসের নিরাপত্তা বিধি দেখুন এবং পরিচালনা করুন।",
        icon: FileLock,
        href: "/admin/rules",
    },
    {
      title: "Export Donors (CSV)",
      description: "সমস্ত ডোনারের তালিকা একটি CSV ফাইলে এক্সপোর্ট করুন।",
      icon: FileDown,
      href: "#", // Placeholder
    },
    {
      title: "Export Requests (CSV)",
      description: "সমস্ত রক্তের অনুরোধ একটি CSV ফাইলে এক্সপোর্ট করুন।",
      icon: Download,
      href: "#", // Placeholder
    },
    {
      title: "Create Database Backup",
      description: "সম্পূর্ণ Firestore ডাটাবেসের একটি ব্যাকআপ তৈরি করুন।",
      icon: DatabaseBackup,
      href: "#", // Placeholder
    },
  ];
  
  export default function AdminDataPage() {
    return (
        <div>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">ডেটা ম্যানেজমেন্ট</CardTitle>
            <CardDescription>
              এখান থেকে আপনি আপনার ডাটাবেস সম্পর্কিত বিভিন্ন কাজ পরিচালনা করতে পারেন, যেমন - ডেটা সিড করা, নিরাপত্তা বিধি দেখা, ডেটা এক্সপোর্ট ও ব্যাকআপ করা।
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataFeatures.map((feature) => (
              <Link href={feature.href} key={feature.title} className={feature.href === '#' ? 'cursor-not-allowed opacity-50' : ''}>
                <Card className="hover:shadow-lg transition-shadow duration-300 h-full p-4">
                  <div className="flex items-start gap-4">
                    <feature.icon className="w-8 h-8 text-primary mt-1" />
                    <div>
                        <h3 className="text-lg font-bold font-headline">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }
  