export default async function handler(req, res) {
  // Meta webhook verification
  if (req.method === "GET") {
    const VERIFY_TOKEN = "support-growth-123";

    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      return res.status(200).send(challenge);
    }

    return res.status(403).send("Verification failed");
  }

  // Receive new leads
  if (req.method === "POST") {
    console.log("New Lead:", JSON.stringify(req.body));

    return res.status(200).send("EVENT_RECEIVED");
  }

  res.status(405).send("Method Not Allowed");
}