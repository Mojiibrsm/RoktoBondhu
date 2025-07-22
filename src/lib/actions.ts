// src/lib/actions.ts
'use server';
import { initializeApp, getApps, App, cert } from 'firebase-admin/app';
import { getFirestore, Firestore, Timestamp } from 'firebase-admin/firestore';
import { answerFAQ } from '@/ai/flows/answer-faq';
import { sendNotification } from '@/ai/flows/send-notification';
import type { AnswerFAQInput, AnswerFAQOutput } from '@/ai/schemas/faq';
import type { SendNotificationInput, SendNotificationOutput } from '@/ai/schemas/notifications';
import { demoData } from './placeholder-data';
import serviceAccount from '../serviceAccountKey.json';

let adminApp: App;
let db: Firestore;

try {
    const appName = 'roktobondhu-admin';
    const existingApp = getApps().find(app => app.name === appName);
    if (existingApp) {
        adminApp = existingApp;
    } else {
        adminApp = initializeApp({
            credential: cert(serviceAccount)
        }, appName);
    }
    db = getFirestore(adminApp);
} catch (error: any) {
    console.error("Firebase Admin Initialization Error in actions.ts:", error.stack);
}


export async function answerFAQOnServer(input: AnswerFAQInput): Promise<AnswerFAQOutput> {
  console.log('Answering question:', input.question);
  try {
    const result = await answerFAQ(input);
    return result;
  } catch (error) {
    console.error("Error in answerFAQOnServer:", error);
    throw new Error("Failed to get an answer from the AI service.");
  }
}

export async function sendNotificationOnServer(input: SendNotificationInput): Promise<SendNotificationOutput> {
  console.log('Sending notification:', input);
  try {
    const result = await sendNotification(input);
    return result;
  } catch (error) {
    console.error("Error in sendNotificationOnServer:", error);
    throw new Error("Failed to send notification.");
  }
}

export async function seedDatabase(collectionName: keyof typeof demoData) {
    if (!db) {
        const message = 'Firestore admin is not initialized. Check server logs for initialization errors.';
        console.error(message);
        return { success: false, message };
    }

    try {
        const batch = db.batch();
        const dataToSeed = demoData[collectionName];

        if (!dataToSeed) {
            throw new Error(`No data found for collection: ${collectionName}`);
        }

        console.log(`Starting to seed collection: ${collectionName}`);

        for (const item of dataToSeed) {
            const docRef = item.id ? db.collection(collectionName).doc(item.id) : db.collection(collectionName).doc();
            const itemWithDates: { [key: string]: any } = { ...item };
            for (const key in itemWithDates) {
                if (Object.prototype.hasOwnProperty.call(itemWithDates, key)) {
                    if (['createdAt', 'dateOfBirth', 'lastDonation', 'postedTime', 'date'].includes(key) && typeof itemWithDates[key] === 'string') {
                         const date = new Date(itemWithDates[key]);
                         if (!isNaN(date.getTime())) {
                            itemWithDates[key] = Timestamp.fromDate(date);
                         }
                    }
                }
            }
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
     if (!db) {
        const message = 'Firestore admin is not initialized. Check server logs for initialization errors.';
        console.error(message);
        return { success: false, message };
    }
    try {
        console.log(`Attempting to update role for UID: ${uid} to ${role}`);
        const userRef = db.doc(`donors/${uid}`);
        await userRef.update({ role: role });
        console.log(`Successfully updated role for UID: ${uid}`);
        return { success: true, message: 'User role updated successfully.' };
    } catch (error) {
        console.error(`Error updating role for UID ${uid}:`, error);
        const errorMessage = error instanceof Error ? error.message : `An unknown error occurred.`;
        return { success: false, message: `Failed to update user role. Reason: ${errorMessage}` };
    }
}

export async function getDonors() {
  if (!db) {
    throw new Error('Firestore admin is not initialized.');
  }
  const donorsSnapshot = await db.collection('donors').get();
  const donors = donorsSnapshot.docs.map(doc => {
    const data = doc.data();
    // Convert Firestore Timestamps to strings
    const sanitizedData: { [key: string]: any } = {};
    for (const key in data) {
        if (data[key] instanceof Timestamp) {
            sanitizedData[key] = data[key].toDate().toISOString();
        } else {
            sanitizedData[key] = data[key];
        }
    }
    return {
      uid: doc.id,
      ...sanitizedData
    };
  });
  return donors;
}

export async function getBloodRequests() {
    if (!db) {
      throw new Error('Firestore admin is not initialized.');
    }
    const requestsSnapshot = await db.collection('bloodRequests').orderBy('postedTime', 'desc').get();
    const requests = requestsSnapshot.docs.map(doc => {
      const data = doc.data();
      // Convert Firestore Timestamps to strings
      const sanitizedData: { [key: string]: any } = {};
      for (const key in data) {
          if (data[key] instanceof Timestamp) {
              sanitizedData[key] = data[key].toDate().toISOString();
          } else {
              sanitizedData[key] = data[key];
          }
      }
      return {
        id: doc.id,
        ...sanitizedData
      };
    });
    return requests;
  }

export async function getBlogPosts() {
    if (!db) {
      throw new Error('Firestore admin is not initialized.');
    }
    const postsSnapshot = await db.collection('blogPosts').orderBy('date', 'desc').get();
    const posts = postsSnapshot.docs.map(doc => {
      const data = doc.data();
      const sanitizedData: { [key: string]: any } = {};
      for (const key in data) {
          if (data[key] instanceof Timestamp) {
              sanitizedData[key] = data[key].toDate().toISOString();
          } else if (key === 'date' && typeof data[key] === 'string') {
              // Also handle string dates for blog posts if they exist
              sanitizedData[key] = new Date(data[key]).toISOString();
          }
          else {
              sanitizedData[key] = data[key];
          }
      }
      return {
        id: doc.id,
        ...sanitizedData
      };
    });
    return posts;
}

export async function getReports() {
    if (!db) {
      throw new Error('Firestore admin is not initialized.');
    }
    const reportsSnapshot = await db.collection('reports').orderBy('date', 'desc').get();
    const reports = reportsSnapshot.docs.map(doc => {
      const data = doc.data();
      const sanitizedData: { [key: string]: any } = {};
      for (const key in data) {
          if (data[key] instanceof Timestamp) {
              sanitizedData[key] = data[key].toDate().toISOString();
          } else {
              sanitizedData[key] = data[key];
          }
      }
      return {
        id: doc.id,
        ...sanitizedData
      };
    });
    return reports;
}
