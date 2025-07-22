// src/app/admin/seed/page.tsx
'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { seedDatabase } from '@/lib/actions';
import { demoData } from '@/lib/placeholder-data';
import { DatabaseZap, Loader2 } from 'lucide-react';

type CollectionName = keyof typeof demoData;

export default function SeedPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState<Partial<Record<CollectionName, boolean>>>({});

  const handleSeed = async (collectionName: CollectionName) => {
    setLoading(prev => ({ ...prev, [collectionName]: true }));
    try {
      const result = await seedDatabase(collectionName);
      if (result.success) {
        toast({
          title: 'সফল!',
          description: result.message,
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'ত্রুটি',
        description: error.message || `Failed to seed ${collectionName}.`,
      });
    } finally {
      setLoading(prev => ({ ...prev, [collectionName]: false }));
    }
  };

  const collectionKeys = Object.keys(demoData) as CollectionName[];

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">ডাটাবেস সিডিং</CardTitle>
          <CardDescription>
            এখান থেকে আপনি আপনার ফায়ারস্টোর ডাটাবেসে ডেমো ডেটা যোগ করতে পারেন।
            প্রতিটি বাটনে ক্লিক করলে সংশ্লিষ্ট কালেকশনে ডেটা যুক্ত হবে।
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {collectionKeys.map((name) => (
            <Card key={name} className="p-4 flex flex-col items-start justify-between">
              <div className="mb-4">
                <h3 className="font-bold text-lg capitalize">{name.replace(/([A-Z])/g, ' $1')}</h3>
                <p className="text-sm text-muted-foreground">{demoData[name].length} টি আইটেম যোগ করা হবে।</p>
              </div>
              <Button onClick={() => handleSeed(name)} disabled={loading[name]} className="w-full">
                {loading[name] ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <DatabaseZap className="mr-2 h-4 w-4" />
                )}
                {loading[name] ? `"${name}" সিড হচ্ছে...` : `Seed "${name}"`}
              </Button>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
