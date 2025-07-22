// src/ai/schemas/notifications.ts
import {z} from 'genkit';

export const SendNotificationInputSchema = z.object({
    channel: z.enum(['email', 'sms']).describe('The channel to send the notification through.'),
    targetType: z.enum(['all', 'bloodGroup', 'location']).describe('The type of target audience for the notification.'),
    targetValue: z.string().optional().describe('The specific value for the target (e.g., a blood group or a location).'),
    message: z.string().describe('The content of the message to be sent.'),
  }).refine(data => {
    if (data.targetType === 'bloodGroup' || data.targetType === 'location') {
        return !!data.targetValue;
    }
    return true;
  }, {
      message: 'টার্গেট ভ্যালু আবশ্যক।',
      path: ['targetValue'],
  });
export type SendNotificationInput = z.infer<typeof SendNotificationInputSchema>;
  
export const SendNotificationOutputSchema = z.object({
    status: z.string().describe('The status of the notification sending process.'),
    messageId: z.string().optional().describe('A unique identifier for the message if sent successfully.'),
});
export type SendNotificationOutput = z.infer<typeof SendNotificationOutputSchema>;
