// src/lib/actions.ts
'use server';

import { answerFAQ } from '@/ai/flows/answer-faq';
import { sendNotification } from '@/ai/flows/send-notification';
import type { AnswerFAQInput, AnswerFAQOutput } from '@/ai/schemas/faq';
import type { SendNotificationInput, SendNotificationOutput } from '@/ai/schemas/notifications';
import { db } from './firebase-admin'; // Using admin SDK for backend operations
import { demoData } from './placeholder-data';
import { collection, writeBatch, doc, updateDoc } from 'firebase/firestore';

export async function answerFAQOnServer(input: AnswerFAQInput): Promise<AnswerFAQOutput> {
  // You could add authentication/authorization checks here
  // to ensure only logged-in users can use this feature.
  console.log('Answering question:', input.question);
  try {
    const result = await answerFAQ(input);
    return result;
  } catch (error) {
    console.error("Error in answerFAQOnServer:", error);
    // In a real app, you might want to log this error to a monitoring service
    throw new Error("Failed to get an answer from the AI service.");
  }
}

export async function sendNotificationOnServer(input: SendNotificationInput): Promise<SendNotificationOutput> {
  // Add authentication/authorization checks here to ensure only admins can use this.
  console.log('Sending notification:', input);
  try {
    // This is a simulated flow. In a real app, this would integrate
    // with an email/SMS provider like SendGrid or Twilio.
    const result = await sendNotification(input);
    return result;
  } catch (error) {
    console.error("Error in sendNotificationOnServer:", error);
    throw new Error("Failed to send notification.");
  }
}

export async function seedDatabase(collectionName: keyof typeof demoData) {
    try {
        const batch = writeBatch(db);
        const dataToSeed = demoData[collectionName];

        if (!dataToSeed) {
            throw new Error(`No data found for collection: ${collectionName}`);
        }

        console.log(`Starting to seed collection: ${collectionName}`);

        for (const item of dataToSeed) {
            // Use the provided id for the document ID
            const docRef = doc(collection(db, collectionName), item.id);

            // Handle date conversion if needed
            const itemWithDates: { [key: string]: any } = { ...item };
            for (const key in itemWithDates) {
                if (Object.prototype.hasOwnProperty.call(itemWithDates, key)) {
                    if (['createdAt', 'dateOfBirth', 'lastDonation', 'postedTime', 'date'].includes(key) && typeof itemWithDates[key] === 'string') {
                         const date = new Date(itemWithDates[key]);
                         if (!isNaN(date.getTime())) {
                            itemWithDates[key] = date;
                         }
                    }
                }
            }
            
            // The entire item (including plaintext password for demo) will be seeded.
            // In a real application, NEVER store plaintext passwords.
            batch.set(docRef, itemWithDates);
        }

        await batch.commit();

        console.log(`Successfully seeded collection: ${collectionName}`);
        return { success: true, message: `Collection "${collectionName}" seeded successfully.` };
    } catch (error) {
        console.error(`Error seeding collection ${collectionName}:`, error);
        const errorMessage = error instanceof Error ? error.message : `An unknown error occurred.`;
        return { success: false, message: `Failed to seed collection "${collectionName}". Reason: ${errorMessage}` };
    }
}

export async function updateUserRole(uid: string, role: 'user' | 'admin') {
    try {
        console.log(`Attempting to update role for UID: ${uid} to ${role}`);
        const userRef = doc(db, 'donors', uid);
        await updateDoc(userRef, { role: role });
        console.log(`Successfully updated role for UID: ${uid}`);
        return { success: true, message: 'User role updated successfully.' };
    } catch (error) {
        console.error(`Error updating role for UID ${uid}:`, error);
        const errorMessage = error instanceof Error ? error.message : `An unknown error occurred.`;
        return { success: false, message: `Failed to update user role. Reason: ${errorMessage}` };
    }
}
