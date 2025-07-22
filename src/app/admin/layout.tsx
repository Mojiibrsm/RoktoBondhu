// src/app/admin/layout.tsx
'use client';
import {
    SidebarProvider,
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarTrigger,
    SidebarInset,
  } from "@/components/ui/sidebar"
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
    Home,
    Loader2,
    DatabaseZap,
    FileLock
  } from "lucide-react"
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

  export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== 'admin') {
                router.push('/login');
            }
        }
    }, [user, loading, router]);

    if(loading || !user || user.role !== 'admin') {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        )
    }

    const navItems = [
        { href: "/admin", icon: LayoutDashboard, label: "ড্যাশবোর্ড" },
        { href: "/admin/donors", icon: Users, label: "ডোনার" },
        { href: "/admin/requests", icon: HeartHandshake, label: "রক্তের অনুরোধ" },
        { href: "/admin/notifications", icon: Bell, label: "নোটিফিকেশন" },
        { href: "/admin/posts", icon: FileText, label: "ব্লগ/পোস্ট" },
        { href: "/admin/reports", icon: ShieldAlert, label: "অভিযোগ/রিপোর্ট" },
        { href: "/admin/manage", icon: UserCog, label: "অ্যাডমিন ম্যানেজ" },
        { href: "/admin/data", icon: Database, label: "ডেটা" },
        { href: "/admin/seed", icon: DatabaseZap, label: "Seed Database" },
        { href: "/admin/rules", icon: FileLock, label: "Firestore Rules" },
        { href: "/admin/feedback", icon: MessageSquare, label: "ফিডব্যাক" },
        { href: "/admin/settings", icon: Settings, label: "সেটিংস" }
    ];

    // Placeholder for pages that are not yet created to avoid 404s.
    // You can remove items from here as you create the pages.
    const placeholderPages = ["/admin/donors", "/admin/requests", "/admin/posts", "/admin/reports", "/admin/data", "/admin/feedback", "/admin/settings"];


    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                            <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" data-ai-hint="male portrait" />
                            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">{user.name}</span>
                            <span className="text-xs text-muted-foreground">অ্যাডমিন</span>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        {navItems.map((item) => (
                             <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton 
                                    asChild 
                                    isActive={pathname === item.href}
                                >
                                    <Link href={placeholderPages.includes(item.href) ? "#" : item.href}>
                                        <item.icon />
                                        {item.label}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>
                <SidebarFooter>
                   <Button asChild variant="ghost">
                        <Link href="/">
                            <Home />
                            হোমপেজে ফিরে যান
                        </Link>
                   </Button>
                </SidebarFooter>
            </Sidebar>
            <SidebarInset>
                <header className="flex items-center justify-between p-4 border-b">
                    <h1 className="text-2xl font-semibold font-headline">অ্যাডমিন প্যানেল</h1>
                    <SidebarTrigger />
                </header>
                <div className="p-4 md:p-6">
                    {children}
                </div>
            </SidebarInset>
      </SidebarProvider>
    )
  }