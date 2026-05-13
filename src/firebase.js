import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfd86Y26SCCgNV4RYWQglUOyEZPDiTxdE",
  authDomain: "support-and-growth-2.firebaseapp.com",
  databaseURL: "https://support-and-growth-2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "support-and-growth-2",
  storageBucket: "support-and-growth-2.firebasestorage.app",
  messagingSenderId: "203468837565",
  appId: "1:203468837565:web:afa6f73d35665a4cda9dd4"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);