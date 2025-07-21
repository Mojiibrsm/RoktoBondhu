import { notFound } from "next/navigation";
import Image from "next/image";
import { blogPosts } from "@/lib/placeholder-data";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

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
              <span>{post.date}</span>
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
          dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p><p>Full content for this article is not yet available. Please check back later for more details on this important topic.</p>` }}
        />
        
        <Separator className="my-8" />
        
        <div className="mt-8">
            <h3 className="font-headline text-xl mb-4">About the Author</h3>
            <p className="text-muted-foreground">{post.author}</p>
        </div>
      </article>
    </div>
  );
}
