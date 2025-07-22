// src/lib/firebase-admin.ts
import * as admin from 'firebase-admin';

// Check if the environment variables are available before initializing
const hasCredentials =
  process.env.FIREBASE_PROJECT_ID &&
  process.env.FIREBASE_CLIENT_EMAIL &&
  process.env.FIREBASE_PRIVATE_KEY;

if (!admin.apps.length && hasCredentials) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

// To prevent crashes when the admin app is not initialized,
// we export the services conditionally.
// In a server environment without credentials, these will be null/undefined,
// and attempting to use them should be handled gracefully in the calling code.
export const auth = admin.apps.length ? admin.auth() : ({} as admin.auth.Auth);
export const db = admin.apps.length ? admin.firestore() : ({} as admin.firestore.Firestore);
