'use client';
import { useState, useEffect } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqForm } from "@/components/faq-form";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

export default function FaqPage() {
    const [faqData, setFaqData] = useState<FaqItem[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'faqs'), (snapshot) => {
            setFaqData(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as FaqItem)));
        });
        return () => unsubscribe();
    }, []);

  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          সাধারণ জিজ্ঞাসা
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mt-4 max-w-3xl mx-auto">
          প্রশ্ন আছে? আমাদের কাছে উত্তর আছে। নিচে রক্তদান সম্পর্কে তথ্য খুঁজুন, অথবা আমাদের এআই সহকারীকে জিজ্ঞাসা করুন।
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="font-headline text-3xl mb-6">সাধারণ প্রশ্নাবলী</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index + 1}`} key={faq.id}>
                <AccordionTrigger className="font-headline text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-foreground/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div>
          <h2 className="font-headline text-3xl mb-6">আমাদের এআই সহকারীকে জিজ্ঞাসা করুন</h2>
          <FaqForm />
        </div>
      </div>
    </div>
  );
}
