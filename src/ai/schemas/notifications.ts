// src/ai/schemas/notifications.ts
import {z} from 'genkit';

export const SendNotificationInputSchema = z.object({
    channel: z.enum(['email', 'sms']).describe('The channel to send the notification through.'),
    target: z.string().describe('The target audience for the notification (e.g., location, blood group).'),
    message: z.string().describe('The content of the message to be sent.'),
  });
export type SendNotificationInput = z.infer<typeof SendNotificationInputSchema>;
  
export const SendNotificationOutputSchema = z.object({
    status: z.string().describe('The status of the notification sending process.'),
    messageId: z.string().optional().describe('A unique identifier for the message if sent successfully.'),
});
export type SendNotificationOutput = z.infer<typeof SendNotificationOutputSchema>;
  
