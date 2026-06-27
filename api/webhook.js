export default async function handler(req, res) {
  const VERIFY_TOKEN = "support-growth-123";

  // Verify webhook
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("WEBHOOK VERIFIED");
      return res.status(200).send(challenge);
    }

    return res.status(403).send("Verification failed");
  }

  // Receive lead events
  if (req.method === "POST") {
    const body = req.body;

    console.log(
      "NEW WEBHOOK EVENT:",
      JSON.stringify(body, null, 2)
    );

    return res.status(200).send("EVENT_RECEIVED");
  }

  return res.status(405).end();
}