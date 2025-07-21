import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaqForm } from "@/components/faq-form";
import { faqData } from "@/lib/placeholder-data";

export default function FaqPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Frequently Asked Questions
        </h1>
        <p className="text-lg md:text-xl text-foreground/80 mt-4 max-w-3xl mx-auto">
          Have questions? We have answers. Find information about blood donation below, or ask our AI assistant.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="font-headline text-3xl mb-6">Common Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index}>
                <AccordionTrigger className="font-headline text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-foreground/80">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div>
          <h2 className="font-headline text-3xl mb-6">Ask Our AI Assistant</h2>
          <FaqForm />
        </div>
      </div>
    </div>
  );
}
