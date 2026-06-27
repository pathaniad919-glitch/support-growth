import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfd86Y26SCCgNV4RYWQglUOyEZPDiTxdE",
  authDomain: "support-and-growth-2.firebaseapp.com",
  projectId: "support-and-growth-2",
  storageBucket: "support-and-growth-2.firebasestorage.app",
  messagingSenderId: "203468837565",
  appId: "1:203468837565:web:afa6f73d35665a4cda9dd4"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  const VERIFY_TOKEN = "support-growth-123";

  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    return res.status(403).send("Verification failed");
  }

  if (req.method === "POST") {
    try {
      console.log("Webhook received:", req.body);

      const leadgenId =
        req.body.entry?.[0]?.changes?.[0]?.value?.leadgen_id;

      const accessToken = "YOUR_ACCESS_TOKEN";

const response = await fetch(
  `https://graph.facebook.com/v25.0/${leadgenId}?fields=field_data&access_token=${accessToken}`
);

const data = await response.json();

console.log("Lead data:", data);

const fields = data.field_data || [];

let name = "";
let phone = "";

fields.forEach((field) => {
  if (field.name === "full_name") {
    name = field.values[0];
  }

  if (field.name === "phone_number") {
    phone = field.values[0];
  }
});

await addDoc(collection(db, "leads"), {
  name,
  phone,
  createdAt: new Date(),
});

      return res.status(200).send("EVENT_RECEIVED");
    } catch (error) {
      console.error("Firebase save error:", error);
      return res.status(500).send("Save failed");
    }
  }

  return res.status(405).send("Method not allowed");
}