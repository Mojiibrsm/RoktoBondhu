// src/lib/actions.ts
'use server';

import { answerFAQ, AnswerFAQInput, AnswerFAQOutput } from '@/ai/flows/answer-faq';
import { sendNotification, SendNotificationInput, SendNotificationOutput } from '@/ai/flows/send-notification';
import { db, auth } from './firebase-admin'; // Switch to admin SDK
import { demoData } from './placeholder-data';
import { collection, writeBatch, doc } from 'firebase/firestore';

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

async function createAuthUser(uid: string, email: string, pass: string, role: string) {
    try {
        await auth.createUser({
            uid: uid,
            email: email,
            password: pass,
        });
        await auth.setCustomUserClaims(uid, { role });
        console.log(`Successfully created auth user: ${email} with role: ${role}`);
    } catch(error: any) {
        if (error.code === 'auth/uid-already-exists' || error.code === 'auth/email-already-exists') {
            console.log(`Auth user ${email} already exists. Setting custom claims.`);
            try {
                await auth.setCustomUserClaims(uid, { role });
            } catch (claimError) {
                console.error(`Failed to set custom claims for ${email}:`, claimError);
            }
        } else {
            console.error(`Error creating auth user ${email}:`, error);
            throw error;
        }
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
            const docRef = doc(collection(db, collectionName), item.id);

            // Handle date conversion if needed
            const itemWithDates: { [key: string]: any } = { ...item };
            for (const key in itemWithDates) {
                if (Object.prototype.hasOwnProperty.call(itemWithDates, key)) {
                    // Check for common date fields and if they are string representations
                    if (['createdAt', 'dateOfBirth', 'lastDonation', 'postedTime', 'date'].includes(key) && typeof itemWithDates[key] === 'string') {
                         const date = new Date(itemWithDates[key]);
                         if (!isNaN(date.getTime())) {
                            itemWithDates[key] = date;
                         }
                    }
                }
            }

            // Remove password from the object that will be stored in Firestore
            const firestoreData = { ...itemWithDates };
            if ('password' in firestoreData) {
                delete firestoreData.password;
            }


            batch.set(docRef, firestoreData);

            // If we are seeding donors, create auth users for them
            if (collectionName === 'donors') {
                const { id, email, password, role } = item as any;
                 if (id && email && password && role) {
                    await createAuthUser(id, email, password, role);
                }
            }
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
