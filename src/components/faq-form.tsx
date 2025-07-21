'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, ExternalLink } from 'lucide-react';
import { answerFAQOnServer } from '@/lib/actions';
import type { AnswerFAQOutput } from '@/ai/flows/answer-faq';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const formSchema = z.object({
  question: z.string().min(10, {
    message: 'Question must be at least 10 characters.',
  }),
});

export function FaqForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnswerFAQOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await answerFAQOnServer({ question: values.question });
      setResult(response);
    } catch (e) {
      setError('An error occurred while fetching the answer. Please try again.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline">Ask a Question</CardTitle>
        <CardDescription>Get an AI-powered answer to your specific question about blood donation.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Question</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., How long do I have to wait to donate after getting a tattoo?"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Getting Answer...' : 'Ask'}
            </Button>
          </CardFooter>
        </form>
      </Form>
      
      {error && (
        <div className="p-4 pt-0">
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}

      {result && (
        <div className="p-4 pt-0">
          <Card className="bg-background/50">
            <CardHeader>
              <CardTitle className="font-headline text-xl">Answer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/90">{result.answer}</p>
              <div>
                <h4 className="font-semibold mb-2">Sources:</h4>
                <ul className="list-disc pl-5 space-y-1">
                  {result.sources.map((source, index) => (
                    <li key={index}>
                      <a href={source} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center gap-1 text-sm">
                        {new URL(source).hostname}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}
