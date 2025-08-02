// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "hotel-6f09f.firebaseapp.com",
  projectId: "hotel-6f09f",
  storageBucket: "hotel-6f09f.firebasestorage.app",
  messagingSenderId: "306774878533",
  appId: "1:306774878533:web:18c5093f3539efcef6b62c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
