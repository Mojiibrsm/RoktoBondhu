// src/ai/flows/answer-faq.ts
'use server';
/**
 * @fileOverview A flow to answer frequently asked questions about blood donation using reliable online resources.
 *
 * - answerFAQ - A function that answers a user's question about blood donation.
 * - AnswerFAQInput - The input type for the answerFAQ function.
 * - AnswerFAQOutput - The return type for the answerFAQ function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerFAQInputSchema = z.object({
  question: z.string().describe('The user question about blood donation.'),
});
export type AnswerFAQInput = z.infer<typeof AnswerFAQInputSchema>;

const AnswerFAQOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question, based on reliable sources.'),
  sources: z.array(z.string()).describe('A list of URLs to reliable sources used to answer the question.'),
});
export type AnswerFAQOutput = z.infer<typeof AnswerFAQOutputSchema>;

export async function answerFAQ(input: AnswerFAQInput): Promise<AnswerFAQOutput> {
  return answerFAQFlow(input);
}

const getRelevantWebsites = ai.defineTool({
  name: 'getRelevantWebsites',
  description: 'Retrieves URLs of websites that may contain the answer to a question about blood donation.',
  inputSchema: z.object({
    query: z.string().describe('The search query to use to find relevant websites.'),
  }),
  outputSchema: z.array(z.string()).describe('A list of URLs of relevant websites.'),
},
async (input) => {
    // Dummy implementation - replace with actual web search logic
    // For demonstration, returns a hardcoded list of URLs
    return [
      'https://www.redcrossblood.org/donate-blood/how-to-donate/eligibility-requirements.html',
      'https://www.aabb.org/',
      'https://www.fda.gov/vaccines-blood-biologics/safety-availability-blood/eligibility-donating-blood'
    ];
});


const answerFAQPrompt = ai.definePrompt({
  name: 'answerFAQPrompt',
  input: {schema: AnswerFAQInputSchema},
  output: {schema: AnswerFAQOutputSchema},
  tools: [getRelevantWebsites],
  prompt: `You are an AI assistant specialized in answering questions about blood donation.
  You will be provided with a question from the user, and your task is to provide an accurate and informative answer based on reliable sources.
  You have access to a tool called 'getRelevantWebsites' that can retrieve a list of URLs that may contain information relevant to the question.

  Here's the question from the user: {{{question}}}

  First, use the 'getRelevantWebsites' tool to find relevant websites for answering the question. Use the user's question as the query for the tool.
  Then, use the information from the retrieved websites to formulate an accurate and comprehensive answer to the question.
  Cite the sources used to create the answer by including the URLs in the 'sources' field.

  Format your response as a JSON object with the following structure:
  {
    "answer": "The answer to the user's question.",
    "sources": ["URL1", "URL2", ...]
  }
  `,
});

const answerFAQFlow = ai.defineFlow(
  {
    name: 'answerFAQFlow',
    inputSchema: AnswerFAQInputSchema,
    outputSchema: AnswerFAQOutputSchema,
  },
  async input => {
    const {output} = await answerFAQPrompt(input);
    return output!;
  }
);
