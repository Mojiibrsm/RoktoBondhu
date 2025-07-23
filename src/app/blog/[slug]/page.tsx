'use client';
import { useState, useEffect } from 'react';
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { format } from 'date-fns';

interface Post {
    id: string;
    title: string;
    author: string;
    date: string;
    image: string;
    aiHint: string;
    content: string;
    excerpt: string;
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
        if (params.slug) {
            const q = query(collection(db, "blogPosts"), where("slug", "==", params.slug), limit(1));
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const data = doc.data();
                // Ensure date is a string or formatted correctly
                if (data.date && typeof data.date.toDate === 'function') {
                    data.date = data.date.toDate().toISOString();
                }
                setPost({ id: doc.id, ...data } as Post);
            } else {
                setPost(null);
            }
        }
        setLoading(false);
    }
    fetchPost();
  }, [params.slug]);


  if (loading) {
      return <div className="container py-12 md:py-16 text-center">পোস্ট লোড হচ্ছে...</div>
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-16">
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary mb-4">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(post.date), "PPP")}</span>
            </div>
          </div>
        </header>

        <Image
          src={post.image}
          alt={post.title}
          width={1200}
          height={675}
          className="w-full h-auto object-cover rounded-lg shadow-lg mb-8"
          data-ai-hint={post.aiHint}
        />

        <Separator className="my-8" />
        
        <div
          className="prose prose-lg max-w-none text-foreground/90"
          dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p><p>এই নিবন্ধটির সম্পূর্ণ বিষয়বস্তু এখনও উপলব্ধ নয়। এই গুরুত্বপূর্ণ বিষয়ে আরও বিস্তারিত জানার জন্য অনুগ্রহ করে পরে আবার দেখুন।</p>` }}
        />
        
        <Separator className="my-8" />
        
        <div className="mt-8">
            <h3 className="font-headline text-xl mb-4">লেখক সম্পর্কে</h3>
            <p className="text-muted-foreground">{post.author}</p>
        </div>
      </article>
    </div>
  );
}
