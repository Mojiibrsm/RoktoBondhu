// src/ai/schemas/faq.ts
import {z} from 'genkit';

export const AnswerFAQInputSchema = z.object({
    question: z.string().describe('The user question about blood donation.'),
});
export type AnswerFAQInput = z.infer<typeof AnswerFAQInputSchema>;
  
export const AnswerFAQOutputSchema = z.object({
    answer: z.string().describe('The answer to the user question, based on reliable sources.'),
    sources: z.array(z.string()).describe('A list of URLs to reliable sources used to answer the question.'),
});
export type AnswerFAQOutput = z.infer<typeof AnswerFAQOutputSchema>;
  
