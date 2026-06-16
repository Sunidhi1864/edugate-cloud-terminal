import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Aapki screen se liya gaya exact configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfC_UrSJp1L4-QZWJTxSKhBquMkp3Jz9U",
  authDomain: "edugate-terminal.firebaseapp.com",
  projectId: "edugate-terminal",
  storageBucket: "edugate-terminal.firebasestorage.app",
  messagingSenderId: "603265756505",
  appId: "1:603265756505:web:6c64fd31ea9ba6845d7048",
};

// Firebase Initialize kiya
const app = initializeApp(firebaseConfig);

// Cloud Database (Firestore) Engine export kiya
export const db = getFirestore(app);
