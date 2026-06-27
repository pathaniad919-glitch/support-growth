import { db } from "../src/firebase";
import { collection, addDoc } from "firebase/firestore";

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
    const body = req.body;

    await addDoc(collection(db, "leads"), {
      source: "Meta Lead Ad",
      data: body,
      createdAt: new Date(),
    });

    console.log("Lead saved:", body);

    return res.status(200).send("EVENT_RECEIVED");
  }

  return res.status(405).send("Method Not Allowed");
}