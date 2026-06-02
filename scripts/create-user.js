import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
const auth = getAuth(app);

async function seedUser() {
  console.log("Creating default user...");
  try {
    await createUserWithEmailAndPassword(auth, "babulal.kannan@programming.com", "welcome@123");
    console.log("User successfully created! Passwords are automatically salted and hashed by Firebase securely.");
    process.exit(0);
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      console.log("User already exists. Skipping creation.");
      process.exit(0);
    } else {
      console.error("Error creating user:", error);
      process.exit(1);
    }
  }
}

seedUser();
