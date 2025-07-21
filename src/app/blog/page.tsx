import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { blogPosts } from "@/lib/placeholder-data";

export default function BlogPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Our Blog
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mt-4 max-w-3xl mx-auto">
          Insights, stories, and information about blood donation. Stay informed, stay inspired.
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
                  <span>By {post.author}</span>
                  <span>{post.date}</span>
                </CardFooter>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
