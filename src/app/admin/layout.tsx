
// src/app/admin/layout.tsx
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
  } from "lucide-react"
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

  export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <div className="flex items-center gap-2">
                        <Avatar className="size-8">
                            <AvatarImage src="https://placehold.co/40x40.png" alt="Admin" data-ai-hint="male portrait" />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold">Admin Panel</span>
                            <span className="text-xs text-muted-foreground">রক্তবন্ধু</span>
                        </div>
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="/admin" asChild isActive>
                                <Link href="/admin">
                                    <LayoutDashboard />
                                    ড্যাশবোর্ড
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="#">
                                <Users />
                                ডোনার
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="#">
                                <HeartHandshake />
                                রক্তের অনুরোধ
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="/admin/notifications">
                                <Bell />
                                নোটিফিকেশন
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="#">
                                <FileText />
                                ব্লগ/পোস্ট
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="#">
                                <ShieldAlert />
                                অভিযোগ/রিপোর্ট
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="#">
                                <UserCog />
                                অ্যাডমিন ম্যানেজ
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="#">
                                <Database />
                                ডেটা
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton href="#">
                                <MessageSquare />
                                ফিডব্যাক
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                         <SidebarMenuItem>
                            <SidebarMenuButton href="#">
                                <Settings />
                                সেটিংস
                            </SidebarMenuButton>
                        </SidebarMenuItem>
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
  