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
  new GoogleAuthProvider();