import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { dsaPatterns } from "../src/data/dsaPatterns.js";
import { systemDesignConcepts } from "../src/data/systemDesignData.js";
import { genAiSessions } from "../src/data/genAiData.js";

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
const db = getFirestore(app);

async function seed() {
  console.log("Starting seed...");
  try {
    // Storing as single documents to minimize Firestore read quotas
    await setDoc(doc(db, "staticData", "dsaPatterns"), { data: dsaPatterns });
    console.log("Seeded DSA Patterns");

    await setDoc(doc(db, "staticData", "systemDesignConcepts"), { data: systemDesignConcepts });
    console.log("Seeded System Design Concepts");

    await setDoc(doc(db, "staticData", "genAiSessions"), { data: genAiSessions });
    console.log("Seeded GenAI Sessions");

    console.log("Seed successful!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database: ", error);
    process.exit(1);
  }
}

seed();
