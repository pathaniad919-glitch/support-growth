import { db } from "../src/firebase";
import { collection, addDoc } from "firebase/firestore";

export default async function handler(req, res) {
  const VERIFY_TOKEN = "support-growth-123";

  // Verification
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    return res.status(403).send("Verification failed");
  }

  // Receive lead
  if (req.method === "POST") {
    try {
      console.log("Webhook received:", req.body);

      const leadData = req.body.entry?.[0]?.changes?.[0]?.value;

      await addDoc(collection(db, "leads"), {
        name: leadData?.name || "Unknown",
        phone: leadData?.phone || "Unknown",
        createdAt: new Date(),
      });

      return res.status(200).send("EVENT_RECEIVED");
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error saving lead");
    }
  }

  return res.status(405).send("Method Not Allowed");
}