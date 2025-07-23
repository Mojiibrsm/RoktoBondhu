'use client';
import { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { format } from 'date-fns';

interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    author: string;
    date: string; // Should be a timestamp in Firestore
    image: string;
    aiHint: string;
}

export default function BlogPage() {
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'blogPosts'));
                setBlogPosts(querySnapshot.docs.map(doc => {
                    const data = doc.data();
                     // Ensure date is a string or formatted correctly
                    if (data.date && typeof data.date.toDate === 'function') {
                        data.date = data.date.toDate().toISOString();
                    }
                    return { id: doc.id, ...data } as BlogPost
                }));
            } catch (error) {
                console.error("Error fetching blog posts: ", error);
            }
        };
        fetchPosts();
    }, []);

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          আমাদের ব্লগ
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mt-4 max-w-3xl mx-auto">
          রক্তদান সম্পর্কে অন্তর্দৃষ্টি, গল্প এবং তথ্য। অবগত থাকুন, অনুপ্রাণিত থাকুন।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <Link href={`/blog/${post.slug}`} className="flex flex-col flex-grow">
              <Image
                src={post.image}
                alt={post.title}
                width={400}
                height={225}
                className="w-full h-48 object-cover"
                data-ai-hint={post.aiHint}
              />
              <div className="flex flex-col flex-grow p-6">
                <CardHeader className="p-0">
                  <CardTitle className="font-headline text-2xl mb-2">{post.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 flex-grow">
                  <p className="text-foreground/80 line-clamp-4">{post.excerpt}</p>
                </CardContent>
                <CardFooter className="p-0 pt-4 mt-auto flex justify-between items-center text-sm text-muted-foreground">
                  <span>{post.author} দ্বারা</span>
                  <span>{post.date ? format(new Date(post.date), "PPP") : ''}</span>
                </CardFooter>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
