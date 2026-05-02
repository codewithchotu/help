// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Using syntactically valid format to prevent SDK internal crashes
// Replace these with your actual Firebase project settings later.
const firebaseConfig = {
  apiKey: "AIzaSyFakeKey1234567890abcdefghijklmnopqrst",
  authDomain: "demo-lifeline-app.firebaseapp.com",
  projectId: "demo-lifeline-app",
  storageBucket: "demo-lifeline-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcd",
};

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);
// export const auth = getAuth(app);

// Export dummy objects to prevent SDK crashes while keeping imports valid
export const db = {};
export const auth = {};
