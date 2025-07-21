import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, User, MapPin, Droplet, Clock, HeartHandshake } from 'lucide-react';
import { topDonors, urgentRequests, blogPosts } from '@/lib/placeholder-data';

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                  Connect. Donate. Save Lives.
                </h1>
                <p className="max-w-[600px] text-foreground/80 md:text-xl">
                  BloodConnect Pro is your platform to find blood donors and request blood in times of need. Join our community and make a difference.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/donors">Find a Donor</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                  <Link href="/requests">Request Blood</Link>
                </Button>
              </div>
            </div>
            <Image
              src="https://placehold.co/600x400.png"
              width="600"
              height="400"
              alt="Hero"
              data-ai-hint="community blood donation"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
            />
          </div>
        </div>
      </section>

      <section id="urgent-requests" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">Urgent Blood Requests</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                These are critical requests that need your immediate attention. Your donation can save a life.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
            {urgentRequests.map((request) => (
              <Card key={request.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between font-headline text-2xl">
                    {request.patientName}
                    <Badge variant="destructive" className="bg-primary">{request.bloodType}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> {request.location}</p>
                  <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Posted {request.postedTime}</p>
                  <p className="text-sm text-foreground/80 pt-2">{request.reason}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90">
                    <Link href={`/requests`}>Contact & Donate</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="top-donors" className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">Our Heroes</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Meet some of our most dedicated donors who are making a real impact in the community.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {topDonors.map((donor) => (
               <Card key={donor.id} className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={`https://placehold.co/96x96.png`} alt={donor.name} data-ai-hint="profile picture" />
                  <AvatarFallback>{donor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold font-headline">{donor.name}</h3>
                <p className="text-sm text-foreground/80">{donor.location}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Droplet className="w-4 h-4 text-primary" />
                  <span className="font-bold text-primary">{donor.bloodType}</span>
                </div>
                <p className="text-sm text-foreground/80 mt-1">{donor.donations} donations</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary text-center">From Our Blog</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto text-center">
              Stay informed and inspired with our articles on blood donation.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover"
                    data-ai-hint={post.aiHint}
                  />
                  <CardHeader>
                    <CardTitle className="font-headline text-xl">{post.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/80 line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="link" className="text-accent text-lg">
              <Link href="/blog">
                Read More Posts <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline text-primary">Join the Lifesaving Community</h2>
            <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Register as a donor today and become a hero in someone's story. It's simple, safe, and profoundly impactful.
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-x-2">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/register">Register to Donate <HeartHandshake className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Dummy Avatar components for placeholder
const Avatar: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => <div className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}>{children}</div>
const AvatarImage: React.FC<{ src: string, alt: string, "data-ai-hint"?: string }> = ({ src, alt, "data-ai-hint": dataAiHint }) => <Image src={src} alt={alt} width={96} height={96} className="aspect-square h-full w-full" data-ai-hint={dataAiHint} />
const AvatarFallback: React.FC<{ children: React.ReactNode }> = ({ children }) => <span className="flex h-full w-full items-center justify-center rounded-full bg-muted">{children}</span>

function cn(...inputs: any[]) {
  const twMerge = require('tailwind-merge').twMerge;
  const clsx = require('clsx');
  return twMerge(clsx(inputs));
}
