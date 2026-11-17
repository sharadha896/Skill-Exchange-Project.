import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBz8pkhJTGAvBlerMbDp1M19iV6hEP_OGc",
  authDomain: "skill-exchange-platform-ec55e.firebaseapp.com",
  projectId: "skill-exchange-platform-ec55e",
  storageBucket: "skill-exchange-platform-ec55e.firebasestorage.app",
  messagingSenderId: "859844581752",
  appId: "1:859844581752:web:7a6e5699d39113b39c508d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();