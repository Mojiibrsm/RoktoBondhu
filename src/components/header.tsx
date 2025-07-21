import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Droplet } from 'lucide-react';

const navLinks = [
  { href: '/donors', label: 'Find Donors' },
  { href: '/requests', label: 'Blood Requests' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Droplet className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block font-headline text-lg">
              BloodConnect Pro
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
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <Link href="/" className="mr-6 flex items-center space-x-2 mb-6">
              <Droplet className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-lg">BloodConnect Pro</span>
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
                    <Button asChild variant="outline" className="border-accent text-accent">
                        <Link href="/login">Log In</Link>
                    </Button>
                    <Button asChild className="bg-primary hover:bg-primary/90">
                        <Link href="/register">Register</Link>
                    </Button>
                 </div>
            </div>
          </SheetContent>
        </Sheet>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            <div className="hidden md:flex md:space-x-2">
                <Button asChild variant="outline" className="border-accent text-accent">
                    <Link href="/login">Log In</Link>
                </Button>
                <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/register">Register</Link>
                </Button>
            </div>
        </div>
      </div>
    </header>
  );
}
