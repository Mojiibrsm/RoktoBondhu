import Link from "next/link";
import { Droplet } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Droplet className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left">
            <span className="font-headline font-medium">ব্লাডকানেক্ট প্রো</span>. জীবন বাঁচানোর জন্য একটি সম্প্রদায়।
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/about" className="hover:text-primary">আমাদের সম্পর্কে</Link>
          <Link href="/team" className="hover:text-primary">আমাদের দল</Link>
          <Link href="/why-donate" className="hover:text-primary">কেন দান করবেন?</Link>
        </div>
        <p className="text-center text-sm md:text-left text-muted-foreground">
          © {new Date().getFullYear()} ব্লাডকানেক্ট প্রো। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
}
