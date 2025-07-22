// src/app/admin/page.tsx
import {
  LayoutDashboard,
  Users,
  HeartHandshake,
  Bell,
  FileText,
  ShieldAlert,
  UserCog,
  Database,
  MessageSquare,
  Settings,
  DatabaseZap,
  FileLock
} from "lucide-react"
import Link from "next/link";
import StatsCards from './dashboard/stats-cards';
import AnalyticsOverview from './dashboard/analytics-overview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
  
const adminFeatures = [
  {
    title: "ডোনার ম্যানেজমেন্ট",
    description: "ডোনারদের তথ্য দেখুন, সম্পাদনা করুন, মুছুন ও যাচাই করুন।",
    icon: Users,
    href: "/admin/donors",
    category: "👥 Donor"
  },
  {
    title: "রক্তের অনুরোধ",
    description: "সক্রিয় অনুরোধগুলো দেখুন, ফিল্টার করুন, পূরণ করুন ও মুছুন।",
    icon: HeartHandshake,
    href: "/admin/requests",
    category: "🆘 Blood Requests"
  },
  {
    title: "নোটিফিকেশন",
    description: "ব্যবহারকারীদের কাছে SMS বা ইমেলের মাধ্যমে বার্তা পাঠান।",
    icon: Bell,
    href: "/admin/notifications",
    category: "📢 Notifications"
  },
  {
    title: "ব্লগ/পোস্ট",
    description: "সচেতনতামূলক পোস্ট পরিচালনা করুন।",
    icon: FileText,
    href: "/admin/posts",
    category: "✍️ Blogs/Posts"
  },
  {
    title: "রিপোর্ট ও অভিযোগ",
    description: "অভিযোগ দেখুন এবং ভুয়া প্রোফাইল ব্লক করুন।",
    icon: ShieldAlert,
    href: "/admin/reports",
    category: "🧾 Reports"
  },
  {
    title: "অ্যাডমিন ম্যানেজমেন্ট",
    description: "অ্যাডমিনদের ভূমিকা এবং অ্যাক্সেস পরিচালনা করুন।",
    icon: UserCog,
    href: "/admin/manage",
    category: "👤 Admins"
  },
  {
    title: "ডেটা ম্যানেজমেন্ট",
    description: "ডেটা এক্সপোর্ট ও ব্যাকআপ করুন।",
    icon: Database,
    href: "/admin/data",
    category: "📂 Data"
  },
  {
    title: "Seed Database",
    description: "ডাটাবেস এ ডেমো ডেটা যোগ করুন।",
    icon: DatabaseZap,
    href: "/admin/seed",
    category: "📂 Data"
  },
  {
    title: "Firestore Rules",
    description: "Firestore নিরাপত্তা বিধি দেখুন।",
    icon: FileLock,
    href: "/admin/rules",
    category: "📂 Data"
  },
  {
    title: "ফিডব্যাক",
    description: "ব্যবহারকারীদের মতামত দেখুন ও উত্তর দিন।",
    icon: MessageSquare,
    href: "/admin/feedback",
    category: "📬 Feedback"
  },
  {
    title: "সেটিংস",
    description: "ওয়েবসাইটের কনফিগারেশন পরিচালনা করুন।",
    icon: Settings,
    href: "/admin/settings",
    category: "⚙️ Settings"
  },
];
  
export default async function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <StatsCards />
      <AnalyticsOverview />

      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">সকল ফিচার</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminFeatures.map((feature) => (
            <Link href={feature.href} key={feature.title} className={feature.href === '#' ? 'cursor-not-allowed' : ''}>
              <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-medium font-headline">{feature.title}</CardTitle>
                  <feature.icon className="w-6 h-6 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
