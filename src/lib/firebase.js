import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmwrR8GVF-Jyf4cqVnVjq8Bc1WXMjeyCs",
  authDomain: "my-internal-medi-1537685742400.firebaseapp.com",
  databaseURL: "https://my-internal-medi-1537685742400.firebaseio.com",
  projectId: "my-internal-medi-1537685742400",
  storageBucket: "my-internal-medi-1537685742400.firebasestorage.app",
  messagingSenderId: "697115045165",
  appId: "1:697115045165:web:7020e8c90aea3757fc37a4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
