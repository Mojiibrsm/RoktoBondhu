// src/app/admin/rules/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Copy, Loader2 } from 'lucide-react';

export default function FirestoreRulesPage() {
  const { toast } = useToast();
  const [rules, setRules] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/firestore.rules')
      .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.text();
      })
      .then((text) => {
        setRules(text);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load firestore rules:', err);
        setRules('নিয়মাবলী লোড করতে ব্যর্থ হয়েছে। অনুগ্রহ করে পৃষ্ঠাটি রিফ্রেশ করুন।');
        setLoading(false);
      });
  }, []);

  const handleCopy = () => {
    if (rules) {
      navigator.clipboard.writeText(rules);
      toast({
        title: 'সফল!',
        description: 'নিয়মাবলী ক্লিপবোর্ডে কপি করা হয়েছে।',
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-3xl">Firestore নিরাপত্তা বিধি</CardTitle>
        <CardDescription>
          নিচের নিয়মগুলো আপনার Firestore ডাটাবেসকে সুরক্ষিত করবে। এই নিয়মগুলো কপি করে আপনার Firebase Console-এর Firestore Rules বিভাগে পেস্ট করুন।
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {loading ? (
            <div className="flex items-center justify-center bg-muted p-4 rounded-md h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm text-foreground">
              <code>{rules}</code>
            </pre>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={handleCopy}
            aria-label="কপি করুন"
            disabled={loading || !rules}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold text-lg">কীভাবে প্রয়োগ করবেন:</h3>
          <ol className="list-decimal list-inside space-y-2 mt-2 text-muted-foreground">
            <li>উপরের বাক্স থেকে সম্পূর্ণ নিয়মাবলী কপি করুন।</li>
            <li>আপনার Firebase Console-এ যান এবং আপনার প্রোজেক্ট নির্বাচন করুন।</li>
            <li>বাম মেনু থেকে **Build** > **Firestore Database**-এ যান।</li>
            <li>**Rules** ট্যাবে ক্লিক করুন।</li>
            <li>বিদ্যমান সমস্ত লেখা মুছে দিয়ে কপি করা নিয়মাবলী পেস্ট করুন।</li>
            <li>**Publish** বাটনে ক্লিক করুন।</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  );
}
