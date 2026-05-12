import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAFduAV_kaDiJAjbYP20k9cQ25bbGhoZJ4",
  authDomain: "support-and-growth-8506c.firebaseapp.com",
  projectId: "support-and-growth-8506c",
  storageBucket: "support-and-growth-8506c.firebasestorage.app",
  messagingSenderId: "125321618667",
  appId: "1:125321618667:web:a7a38989691c8257f08aae"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
  new GoogleAuthProvider();import { initializeApp } from "firebase/app";

import {
  getAuth
} from "firebase/auth";

import {
  getFirestore
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfd86Y26SCCgNV4RYWQglUOyEZPDiTxdE",
  authDomain: "support-and-growth-2.firebaseapp.com",
  projectId: "support-and-growth-2",
  storageBucket: "support-and-growth-2.firebasestorage.app",
  messagingSenderId: "203468837565",
  appId: "1:203468837565:web:afa6f73d35665a4cda9dd4"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);