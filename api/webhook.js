export default async function handler(req, res) {
  const VERIFY_TOKEN = "support-growth-123";

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

  if (req.method === "POST") {
    const body = req.body;

    for (const entry of body.entry || []) {
      for (const change of entry.changes || []) {
        if (change.field === "leadgen") {
          const leadId = change.value.leadgen_id;

          console.log("Lead ID:", leadId);

          const response = await fetch(
            `https://graph.facebook.com/v25.0/${leadId}?access_token=${process.env.PAGE_ACCESS_TOKEN}`
          );

          const leadData = await response.json();

          console.log("Lead Details:", leadData);
        }
      }
    }

    return res.status(200).send("EVENT_RECEIVED");
  }

  return res.status(405).end();
}