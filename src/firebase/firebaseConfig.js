import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "booknest-07.firebaseapp.com",
    projectId: "booknest-07",
    storageBucket: "booknest-07.firebasestorage.app",
    messagingSenderId: "430462556159",
    appId: "1:430462556159:web:e2bafb674cffa9b282f9ca",
    measurementId: "G-81YR7S82CN"
};

export const app = initializeApp(firebaseConfig);
