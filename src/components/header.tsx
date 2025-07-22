'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Droplet, User, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const navLinks = [
  { href: '/donors', label: 'দাতা খুঁজুন' },
  { href: '/requests', label: 'রক্তের অনুরোধ' },
  { href: '/blog', label: 'ব্লগ' },
  { href: '/faq', label: 'সাধারণ জিজ্ঞাসা' },
];

export function Header() {
  const { user, userDoc, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Droplet className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline text-lg">
              রক্তবন্ধু
            </span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              aria-label="মেনু খুলুন"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
              <Droplet className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg">রক্তবন্ধু</span>
            </Link>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-primary text-lg"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t">
                 <div className="flex flex-col space-y-2">
                    {user ? (
                        <>
                            <Button asChild variant="outline" className="border-accent text-accent">
                                <Link href={userDoc?.role === 'admin' ? '/admin' : '/profile'}>প্রোফাইল</Link>
                            </Button>
                            <Button onClick={handleLogout} variant="destructive">
                                <LogOut className="mr-2" /> লগ আউট
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button asChild variant="outline" className="border-accent text-accent">
                                <Link href="/login">লগ ইন</Link>
                            </Button>
                            <Button asChild className="bg-primary hover:bg-primary/90">
                                <Link href="/register">নিবন্ধন</Link>
                            </Button>
                        </>
                    )}
                 </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="hidden md:flex md:space-x-2">
                {user ? (
                    <>
                        <Button asChild variant="ghost">
                             <Link href={userDoc?.role === 'admin' ? '/admin' : '/profile'}>
                                 <User className="mr-2" />
                                 {userDoc?.name || 'প্রোফাইল'}
                             </Link>
                        </Button>
                        <Button onClick={handleLogout} variant="outline">
                            <LogOut className="mr-2" /> লগ আউট
                        </Button>
                    </>
                ) : (
                    <>
                        <Button asChild variant="outline" className="border-accent text-accent">
                            <Link href="/login">লগ ইন</Link>
                        </Button>
                        <Button asChild className="bg-primary hover:bg-primary/90">
                            <Link href="/register">নিবন্ধন</Link>
                        </Button>
                    </>
                )}
            </div>
        </div>
      </div>
    </header>
  );
}
