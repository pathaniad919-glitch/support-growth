import Razorpay from "razorpay";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }

  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: "Name and phone are required",
      });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: 9900,
      currency: "INR",
      receipt: `sg_${Date.now()}`,

      notes: {
        name,
        phone,
      },
    };

    const order =
      await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });

  } catch (error) {
    console.error(
      "Razorpay Order Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Unable to create Razorpay order",
    });
  }
}