import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, User, MapPin, Droplet, Clock, HeartHandshake, Search, Heart } from 'lucide-react';
import { topDonors, urgentRequests, blogPosts } from '@/lib/placeholder-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';


export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-red-50/50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 text-center">
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="space-y-4">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none text-primary">
                  রক্ত দিন, জীবন বাঁচান – এখন আরও সহজে!
                </h1>
                <p className="max-w-[600px] text-foreground/80 md:text-xl">
                  দ্রুত রক্ত খুঁজুন অথবা স্বেচ্ছাসেবী হোন
                </p>
              </div>
              <div className="flex flex-col gap-4 min-[400px]:flex-row">
                <Button asChild size="lg" variant="outline" className="bg-white hover:bg-gray-100 text-gray-800 border-gray-200 shadow-sm">
                  <Link href="/donors"><Search className="mr-2" />রক্ত খুঁজুন</Link>
                </Button>
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                  <Link href="/register"><Heart className="mr-2" />ডোনার হোন</Link>
                </Button>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <section id="urgent-requests" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">জরুরী রক্তের অনুরোধ</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                এইগুলি গুরুতর অনুরোধ যা আপনার অবিলম্বে মনোযোগ প্রয়োজন। আপনার দান একটি জীবন বাঁচাতে পারে।
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
                  <p className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> পোস্ট করা হয়েছে {request.postedTime}</p>
                  <p className="text-sm text-foreground/80 pt-2">{request.reason}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-accent hover:bg-accent/90">
                    <Link href={`/requests`}>যোগাযোগ ও দান করুন</Link>
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">আমাদের বীরেরা</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                আমাদের সবচেয়ে নিবেদিত কিছু দাতাদের সাথে দেখা করুন যারা সম্প্রদায়ে সত্যিকারের প্রভাব ফেলছেন।
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
                <p className="text-sm text-foreground/80 mt-1">{donor.donations} বার দান করেছেন</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary text-center">আমাদের ব্লগ থেকে</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto text-center">
              রক্তদান সম্পর্কিত আমাদের নিবন্ধগুলির সাথে অবগত এবং অনুপ্রাণিত থাকুন।
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
                আরও পোস্ট পড়ুন <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline text-primary">জীবন বাঁচানোর সম্প্রদায়ে যোগ দিন</h2>
            <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              আজই একজন দাতা হিসাবে নিবন্ধন করুন এবং কারো গল্পের নায়ক হয়ে উঠুন। এটি সহজ, নিরাপদ এবং গভীরভাবে প্রভাবশালী।
            </p>
          </div>
          <div className="mx-auto w-full max-w-sm space-x-2">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
              <Link href="/register">দান করতে নিবন্ধন করুন <HeartHandshake className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

    