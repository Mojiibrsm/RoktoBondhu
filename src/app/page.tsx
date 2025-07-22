'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, User, MapPin, Droplet, Clock, HeartHandshake, Search, Heart, Stethoscope, Smile, RefreshCw, Users, BarChart2, LifeBuoy, Handshake, Quote, BellRing, Navigation, Mail, ClipboardList, Github, Linkedin, Globe } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, query, limit, orderBy } from "firebase/firestore";

interface UrgentRequest {
    id: string;
    patientName: string;
    bloodType: string;
    location: string;
    reason: string;
    postedTime: string; // This might need conversion from a timestamp
}

interface TopDonor {
    id: string;
    name: string;
    location: string;
    bloodType: string;
    donations: number;
    image: string;
}

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    image: string;
    aiHint: string;
}

interface Testimonial {
    id: string;
    name: string;
    location: string;
    quote: string;
    image: string;
    aiHint: string;
}


export default function Home() {
    const [urgentRequests, setUrgentRequests] = useState<UrgentRequest[]>([]);
    const [topDonors, setTopDonors] = useState<TopDonor[]>([]);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

    useEffect(() => {
        const urgentRequestsQuery = query(collection(db, 'bloodRequests'), where('status', '==', 'জরুরী'), limit(3));
        const topDonorsQuery = query(collection(db, 'donors'), orderBy('totalDonations', 'desc'), limit(4));
        const blogPostsQuery = query(collection(db, 'blogPosts'), limit(3));
        const testimonialsQuery = query(collection(db, 'testimonials'), limit(3));

        const unsubUrgent = onSnapshot(urgentRequestsQuery, snapshot => {
            setUrgentRequests(snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    // Convert Firestore Timestamp to readable string if needed
                    postedTime: data.postedTime?.toDate ? new Date(data.postedTime.toDate()).toLocaleTimeString('bn-BD') : 'কিছুক্ষণ আগে'
                } as UrgentRequest;
            }));
        });

        const unsubDonors = onSnapshot(topDonorsQuery, snapshot => {
            setTopDonors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TopDonor)));
        });

        const unsubBlogs = onSnapshot(blogPostsQuery, snapshot => {
            setBlogPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as BlogPost)));
        });

        const unsubTestimonials = onSnapshot(testimonialsQuery, snapshot => {
            setTestimonials(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial)));
        });

        return () => {
            unsubUrgent();
            unsubDonors();
            unsubBlogs();
            unsubTestimonials();
        }
    }, []);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 text-center">
            <div className="flex flex-col justify-center items-center space-y-4">
              <div className="space-y-4">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none text-primary">
                  রক্ত দিন, জীবন বাঁচান
                </h1>
                <p className="max-w-[600px] text-foreground/80 md:text-xl">
                  একটি ক্লিকেই খুঁজুন রক্তদাতা
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

      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">এটা যেভাবে কাজ করে</h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    মাত্র ৩টি সহজ ধাপে জীবন বাঁচাতে সাহায্য করুন।
                </p>
                </div>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-8 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
                <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center border-t-4 border-primary">
                    <div className="mb-4 bg-primary/10 rounded-full p-4">
                        <User className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-headline mb-2">পদক্ষেপ ১: রেজিস্টার</h3>
                    <p className="text-foreground/80">একজন রক্তদাতা হিসাবে আপনার প্রোফাইল তৈরি করুন।</p>
                </Card>
                <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center border-t-4 border-primary">
                    <div className="mb-4 bg-primary/10 rounded-full p-4">
                        <Search className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-headline mb-2">পদক্ষেপ ২: খুঁজুন বা দিন</h3>
                    <p className="text-foreground/80">রক্ত খুঁজুন অথবা রক্তদানের জন্য উপলব্ধ হন।</p>
                </Card>
                <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center border-t-4 border-primary">
                    <div className="mb-4 bg-primary/10 rounded-full p-4">
                        <Handshake className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold font-headline mb-2">পদক্ষেপ ৩: যোগাযোগ</h3>
                    <p className="text-foreground/80">প্রয়োজনে যোগাযোগ করুন এবং জীবন বাঁচান।</p>
                </Card>
            </div>
        </div>
      </section>

      <section id="urgent-requests" className="w-full py-12 md:py-24 lg:py-32 bg-background">
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
              <Card key={request.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background">
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
      
      <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">আমাদের ফিচারসমূহ</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                রক্তবন্ধু আপনাকে আধুনিক সব সুবিধা প্রদান করে যা রক্তদান প্রক্রিয়াকে সহজ ও কার্যকর করে তোলে।
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center">
              <div className="mb-4 bg-primary/10 rounded-full p-4">
                <BellRing className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">রিয়েল-টাইম রিকোয়েস্ট</h3>
              <p className="text-sm text-foreground/80">জরুরী রক্তের প্রয়োজনে সাথে সাথে নোটিফিকেশন পান এবং দ্রুত সাড়া দিন।</p>
            </Card>
            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center">
              <div className="mb-4 bg-primary/10 rounded-full p-4">
                <Navigation className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">লোকেশন ভিত্তিক খোঁজ</h3>
              <p className="text-sm text-foreground/80">আপনার এলাকার নিকটবর্তী রক্তদাতাদের সহজেই খুঁজে বের করুন।</p>
            </Card>
            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center">
              <div className="mb-4 bg-primary/10 rounded-full p-4">
                <Mail className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">জরুরী নোটিফিকেশন</h3>
              <p className="text-sm text-foreground/80">প্রয়োজনীয় মুহূর্তে SMS বা Email এর মাধ্যমে বার্তা পাঠান বা গ্রহণ করুন।</p>
            </Card>
            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center">
              <div className="mb-4 bg-primary/10 rounded-full p-4">
                <ClipboardList className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">রক্তদানের রেকর্ড</h3>
              <p className="text-sm text-foreground/80">আপনার রক্তদানের ইতিহাস ও পরবর্তী তারিখ সহজেই ট্র্যাক করুন।</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="top-donors" className="w-full py-12 md:py-24 lg:py-32">
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
                <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                  <AvatarImage src={donor.image || 'https://placehold.co/96x96.png'} alt={donor.name} data-ai-hint="profile picture" />
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

      <section id="statistics" className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
        <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">আমাদের পরিসংখ্যান</h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    আমাদের সম্প্রদায়ের সম্মিলিত প্রভাব দেখুন।
                </p>
                </div>
            </div>
            <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12 text-center">
                <div className="flex flex-col items-center justify-center">
                    <Users className="h-16 w-16 text-primary mb-4" />
                    <p className="text-5xl font-bold font-headline">5,000+</p>
                    <p className="text-xl text-foreground/80 mt-2">মোট ডোনার</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <LifeBuoy className="h-16 w-16 text-primary mb-4" />
                    <p className="text-5xl font-bold font-headline">10,000+</p>
                    <p className="text-xl text-foreground/80 mt-2">মোট রিকোয়েস্ট</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <HeartHandshake className="h-16 w-16 text-primary mb-4" />
                    <p className="text-5xl font-bold font-headline">8,500+</p>
                    <p className="text-xl text-foreground/80 mt-2">সফল ডোনেশন</p>
                </div>
            </div>
        </div>
       </section>
      
      <section id="why-donate" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">কেন রক্তদান করবেন?</h2>
              <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                আপনার এক ব্যাগ রক্ত পারে একজন মানুষের জীবন বাঁচাতে। রক্তদানের মাধ্যমে আপনিও পেতে পারেন অনেক সুবিধা।
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-8">
            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center">
              <HeartHandshake className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-xl font-bold font-headline mb-2">জীবন বাঁচান</h3>
              <p className="text-sm text-foreground/80">আপনার দান করা রক্ত মুমূর্ষু রোগীর জীবন রক্ষা করতে পারে।</p>
            </Card>
            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center">
              <Stethoscope className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-xl font-bold font-headline mb-2">স্বাস্থ্য পরীক্ষা</h3>
              <p className="text-sm text-foreground/80">রক্তদানের আগে আপনার স্বাস্থ্য বিনামূল্যে পরীক্ষা করার সুযোগ হয়।</p>
            </Card>
            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center">
              <Smile className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-xl font-bold font-headline mb-2">মানসিক শান্তি</h3>
              <p className="text-sm text-foreground/80">অন্যের জীবন বাঁচাতে সাহায্য করার মাধ্যমে আপনি মানসিক তৃপ্তি লাভ করেন।</p>
            </Card>
            <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center">
              <RefreshCw className="h-16 w-16 text-primary mb-4" />
              <h3 className="text-xl font-bold font-headline mb-2">নতুন রক্তকণিকা তৈরি</h3>
              <p className="text-sm text-foreground/80">রক্তদানের পর শরীরে নতুন রক্তকণিকা তৈরি হয় যা শরীরকে সতেজ রাখে।</p>
            </Card>
          </div>
        </div>
      </section>

      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary">সাফল্যের গল্প</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto mt-4">
              আমাদের সম্প্রদায় থেকে কিছু অনুপ্রেরণামূলক গল্প শুনুন।
            </p>
          </div>
          <div className="mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-12">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center border-b-4 border-primary">
                <Avatar className="w-24 h-24 mb-4 border-2 border-primary">
                  <AvatarImage src={testimonial.image || 'https://placehold.co/96x96.png'} alt={testimonial.name} data-ai-hint={testimonial.aiHint} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardContent className="flex-grow">
                  <Quote className="w-8 h-8 text-primary/30 mx-auto mb-4" />
                  <p className="text-foreground/80 italic mb-4">{testimonial.quote}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-center p-0">
                  <h3 className="text-xl font-bold font-headline">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="director-message" className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="mx-auto max-w-4xl">
            <Card className="p-8 shadow-lg">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1 flex justify-center">
                  <Avatar className="w-40 h-40 border-4 border-primary">
                    <AvatarImage src="https://placehold.co/160x160.png" alt="Mujibur Rahman" data-ai-hint="male portrait" />
                    <AvatarFallback>MR</AvatarFallback>
                  </Avatar>
                </div>
                <div className="md:col-span-2 space-y-4">
                  <h2 className="text-3xl font-bold font-headline text-primary">পরিচালকের বার্তা</h2>
                  <blockquote className="text-lg italic text-foreground/80 border-l-4 border-primary pl-4">
                    "রক্তবন্ধু একটি অলাভজনক উদ্যোগ যা রক্তদাতা এবং গ্রহীতাদের মধ্যে একটি সেতুবন্ধন তৈরির লক্ষ্যে কাজ করে। প্রযুক্তি ব্যবহার করে জীবন বাঁচানোর এই যাত্রায় আমাদের সঙ্গী হওয়ার জন্য আপনাকে ধন্যবাদ।"
                  </blockquote>
                  <p className="text-right font-semibold">- মুজিবুর রহমান, প্রতিষ্ঠাতা</p>
                  <div className="flex justify-end items-center gap-4 text-primary">
                    <a href="#" aria-label="Facebook" className="hover:text-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                    </a>
                    <a href="#" aria-label="LinkedIn" className="hover:text-accent"><Linkedin className="h-6 w-6" /></a>
                    <a href="#" aria-label="GitHub" className="hover:text-accent"><Github className="h-6 w-6" /></a>
                    <a href="#" aria-label="Website" className="hover:text-accent"><Globe className="h-6 w-6" /></a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
      
      <section id="blog" className="w-full py-12 md:py-24 lg:py-32 bg-background">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-primary text-center">আমাদের ব্লগ থেকে</h2>
            <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto text-center">
              রক্তদান সম্পর্কিত আমাদের নিবন্ধগুলির সাথে অবগত এবং অনুপ্রাণিত থাকুন।
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-background">
                <Link href={`/blog/${post.slug}`}>
                  <Image
                    src={post.image || 'https://placehold.co/400x225.png'}
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
      
      <section className="w-full py-12 md:py-24 lg:py-32">
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
