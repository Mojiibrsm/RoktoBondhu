// src/app/admin/data/page.tsx
'use client';
import { useState } from 'react';
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
    Download,
    FileText,
    Loader2,
} from "lucide-react"
import Link from "next/link";
import { useToast } from '@/hooks/use-toast';
import { getDonors, getBloodRequests } from '@/lib/actions';


const dataFeatures = [
    {
        id: "seed",
        title: "Seed Database",
        description: "ডাটাবেস এ ডেমো ডেটা যোগ করুন। এটি নতুন ডেটা দিয়ে কালেকশনগুলো পূরণ করবে।",
        icon: DatabaseZap,
        href: "/admin/seed",
    },
    {
        id: "rules",
        title: "Firestore Rules",
        description: "আপনার Firestore ডাটাবেসের নিরাপত্তা বিধি দেখুন এবং পরিচালনা করুন।",
        icon: FileLock,
        href: "/admin/rules",
    },
    {
        id: "export-donors-csv",
        title: "Export Donors (CSV)",
        description: "সমস্ত ডোনারের তালিকা একটি CSV ফাইলে এক্সপোর্ট করুন।",
        icon: FileDown,
        action: async () => {
            const donors = await getDonors();
            console.log("Donors for CSV Export:", donors);
            // In a real implementation, you would generate a CSV file here.
        },
    },
    {
        id: "export-requests-csv",
        title: "Export Requests (CSV)",
        description: "সমস্ত রক্তের অনুরোধ একটি CSV ফাইলে এক্সপোর্ট করুন।",
        icon: Download,
        action: async () => {
            const requests = await getBloodRequests();
            console.log("Requests for CSV Export:", requests);
        },
    },
    {
        id: "export-donors-pdf",
        title: "Export Donors (PDF)",
        description: "সমস্ত ডোনারের তালিকা একটি PDF ফাইলে এক্সপোর্ট করুন।",
        icon: FileText,
        action: async () => {
            const donors = await getDonors();
            console.log("Donors for PDF Export:", donors);
        },
    },
    {
        id: "export-requests-pdf",
        title: "Export Requests (PDF)",
        description: "সমস্ত রক্তের অনুরোধ একটি PDF ফাইলে এক্সপোর্ট করুন।",
        icon: FileText,
        action: async () => {
            const requests = await getBloodRequests();
            console.log("Requests for PDF Export:", requests);
        },
    },
    {
        id: "backup",
        title: "Create Database Backup",
        description: "সম্পূর্ণ Firestore ডাটাবেসের একটি ব্যাকআপ তৈরি করুন।",
        icon: DatabaseBackup,
        action: async () => {
           console.log("Database backup process started.");
        },
    },
];

export default function AdminDataPage() {
    const { toast } = useToast();
    const [loading, setLoading] = useState<string | null>(null);

    const handleFeatureClick = async (e: React.MouseEvent, feature: (typeof dataFeatures)[0]) => {
        if (!feature.action) return;

        e.preventDefault();
        setLoading(feature.id);
        
        try {
            await feature.action();
            toast({
                title: "কার্যকরী নয়",
                description: `${feature.title} ফিচারটি শীঘ্রই আসছে। ডেটা কনসোলে লগ করা হয়েছে।`,
            });
        } catch (error) {
            console.error(`Error during ${feature.title}:`, error);
            toast({
                variant: 'destructive',
                title: 'ত্রুটি',
                description: `কার্যক্রমটি সম্পন্ন করা যায়নি।`,
            });
        } finally {
            setLoading(null);
        }
    };


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
                <Link href={feature.href || '#'} key={feature.id} onClick={(e) => handleFeatureClick(e, feature)} className={loading === feature.id ? 'cursor-wait' : ''}>
                    <Card className="hover:shadow-lg transition-shadow duration-300 h-full p-4">
                    <div className="flex items-start gap-4">
                        {loading === feature.id ? <Loader2 className="w-8 h-8 text-primary mt-1 animate-spin" /> : <feature.icon className="w-8 h-8 text-primary mt-1" />}
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
