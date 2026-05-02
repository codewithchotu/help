import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBztdLkWxO2UtOnzjDl2wQnVJeZr4HIFjI",
  authDomain: "new-blood-26bf2.firebaseapp.com",
  projectId: "new-blood-26bf2",
  storageBucket: "new-blood-26bf2.firebasestorage.app",
  messagingSenderId: "96400267101",
  appId: "1:96400267101:web:6d54fc45c1390a1df33ab4",
  measurementId: "G-LNF0VER1YK"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
