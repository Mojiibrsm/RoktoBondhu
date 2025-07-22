// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "roktobondhu-9ydo3",
  "appId": "1:906413458872:web:db31dcf89ddc53eef43b4d",
  "storageBucket": "roktobondhu-9ydo3.firebasestorage.app",
  "apiKey": "AIzaSyB_4laymJYn12YDRDq_Smrnl7KHPdaeVYI",
  "authDomain": "roktobondhu-9ydo3.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "906413458872"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
