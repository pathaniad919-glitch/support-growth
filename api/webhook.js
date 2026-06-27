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
    console.log("Webhook received:", JSON.stringify(req.body, null, 2));

    const leadgenId =
      req.body.entry?.[0]?.changes?.[0]?.value?.leadgen_id;

    await addDoc(collection(db, "leads"), {
      name: "Test Lead",
      phone: leadgenId || "No ID",
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