import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAC9WubbLbUSbWVgrlwguBpM3PI0RLfgZc",
  authDomain: "cnproject-e5748.firebaseapp.com",
  projectId: "cnproject-e5748",
  storageBucket: "cnproject-e5748.appspot.com",
  messagingSenderId: "615425146318",
  appId: "1:615425146318:web:8ef050f9ce0aaefb0fff9f",
  measurementId: "G-HLC617S6NF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
