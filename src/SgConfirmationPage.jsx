import { useEffect, useRef, useState } from "react";

function SgConfirmationPage() {
  const [videoCompleted, setVideoCompleted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const playerRef = useRef(null);

  // =====================================================
  // YOUTUBE VIDEO
  // =====================================================

  useEffect(() => {
    const createPlayer = () => {
      if (
        playerRef.current ||
        !window.YT ||
        !window.YT.Player
      ) {
        return;
      }

      playerRef.current = new window.YT.Player(
        "sg-funnel-video",
        {
          videoId: "FkKFAqCCDbU",

          playerVars: {
            rel: 0,
            modestbranding: 1,
          },

          events: {
            onStateChange: (event) => {
              if (
                event.data ===
                window.YT.PlayerState.ENDED
              ) {
                setVideoCompleted(true);
              }
            },
          },
        }
      );
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const existingScript =
        document.getElementById(
          "youtube-iframe-api"
        );

      if (!existingScript) {
        const tag = document.createElement("script");

        tag.id = "youtube-iframe-api";
        tag.src =
          "https://www.youtube.com/iframe_api";

        document.body.appendChild(tag);
      }

      window.onYouTubeIframeAPIReady =
        createPlayer;
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, []);

  // =====================================================
  // LOAD RAZORPAY
  // =====================================================

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");

      script.src =
        "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // =====================================================
  // REGISTER + PAYMENT
  // =====================================================

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      alert("Please fill your name and WhatsApp number.");
      return;
    }

    const cleanPhone = phone.replace(/\D/g, "");

    if (cleanPhone.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      // LOAD RAZORPAY
      const razorpayLoaded =
        await loadRazorpay();

      if (!razorpayLoaded) {
        alert(
          "Razorpay could not be loaded. Please check your internet connection."
        );

        setLoading(false);
        return;
      }

      // CREATE ORDER
      const response = await fetch(
        "/api/create-order",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: name.trim(),
            phone: cleanPhone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Unable to create payment order."
        );
      }

      // RAZORPAY CHECKOUT
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.order.amount,

        currency: data.order.currency,

        name: "Support & Growth",

        description:
          "Premium Training Workshop",

        order_id: data.order.id,

        prefill: {
          name: name.trim(),
          contact: cleanPhone,
        },

        notes: {
          name: name.trim(),
          phone: cleanPhone,
        },

        theme: {
          color: "#8b5cf6",
        },

        handler: function (paymentResponse) {
          console.log(
            "Payment successful:",
            paymentResponse
          );

          // =================================================
          // WHATSAPP CONFIRMATION
          // =================================================

          const message = `
Hello Support & Growth 👋

I have successfully registered for the ₹99 Premium Training Workshop.

Name: ${name.trim()}
Phone: ${cleanPhone}

Payment ID:
${paymentResponse.razorpay_payment_id}

Order ID:
${paymentResponse.razorpay_order_id}

Please confirm my workshop registration.
`;

          // IMPORTANT:
          // Apna WhatsApp number yahan rakho
          // 91 + 10 digit number
          const whatsappNumber =
            "917657986067";

          const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=` +
            encodeURIComponent(message);

          window.location.href =
            whatsappURL;
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.on(
        "payment.failed",
        function (response) {
          console.error(
            "Payment failed:",
            response.error
          );

          alert(
            "Payment failed. Please try again."
          );

          setLoading(false);
        }
      );

      razorpay.open();
    } catch (error) {
      console.error(
        "Payment Error:",
        error
      );

      alert(
        error.message ||
          "Something went wrong. Please try again."
      );

      setLoading(false);
    }
  };

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#020617 0%,#050816 50%,#0f172a 100%)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "25px 18px 70px",
        boxSizing: "border-box",
      }}
    >

      {/* BRAND */}

      <div
        style={{
          textAlign: "center",
          marginBottom: "35px",
        }}
      >
        <img
          src="/logo.png"
          alt="Support & Growth"
          style={{
            width: "180px",
            maxWidth: "70%",
          }}
        />

        <p
          style={{
            color: "#94a3b8",
            fontSize: "14px",
            letterSpacing: "2px",
            marginTop: "10px",
          }}
        >
          SUPPORT & GROWTH
        </p>
      </div>

      {/* MAIN */}

      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >

        {/* BADGE */}

        <div
          style={{
            display: "inline-block",
            padding: "10px 18px",
            borderRadius: "999px",
            background:
              "rgba(139,92,246,0.12)",
            border:
              "1px solid rgba(139,92,246,0.3)",
            color: "#c4b5fd",
            fontSize: "14px",
            fontWeight: "bold",
            marginBottom: "22px",
          }}
        >
          🚀 PREMIUM TRAINING ACCESS
        </div>

        {/* HEADLINE */}

        <h1
          style={{
            fontSize:
              window.innerWidth < 768
                ? "42px"
                : "72px",
            lineHeight: "1.08",
            margin: "0 0 25px",
            fontWeight: "800",
          }}
        >
          Learn Skills.
          <br />

          <span
            style={{
              background:
                "linear-gradient(to right,#8b5cf6,#38bdf8)",
              WebkitBackgroundClip:
                "text",
              WebkitTextFillColor:
                "transparent",
            }}
          >
            Build Your Future.
          </span>
        </h1>

        {/* DESCRIPTION */}

        <p
          style={{
            color: "#cbd5e1",
            fontSize:
              window.innerWidth < 768
                ? "18px"
                : "22px",
            lineHeight: "1.8",
            maxWidth: "800px",
            margin: "0 auto 45px",
          }}
        >
          Watch the complete training video
          below to understand our learning and
          mentorship system.
        </p>

        {/* VIDEO */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.05)",
            border:
              "1px solid rgba(255,255,255,0.1)",
            borderRadius: "25px",
            padding:
              window.innerWidth < 768
                ? "10px"
                : "18px",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              paddingTop: "56.25%",
              overflow: "hidden",
              borderRadius: "18px",
            }}
          >
            <div
              id="sg-funnel-video"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>

        {/* STATUS */}

        <div
          style={{
            marginTop: "22px",
            padding: "15px",
            borderRadius: "14px",

            background:
              videoCompleted
                ? "rgba(34,197,94,0.12)"
                : "rgba(250,204,21,0.08)",

            border:
              videoCompleted
                ? "1px solid rgba(34,197,94,0.3)"
                : "1px solid rgba(250,204,21,0.2)",

            color:
              videoCompleted
                ? "#4ade80"
                : "#facc15",

            fontWeight: "bold",
          }}
        >
          {videoCompleted
            ? "✅ Training completed — Registration is now unlocked."
            : "🔒 Please watch the complete training video to continue."}
        </div>

        {/* REGISTER */}

        <button
          disabled={!videoCompleted}
          onClick={() =>
            setShowForm(true)
          }
          style={{
            marginTop: "28px",
            width: "100%",
            maxWidth: "600px",
            padding: "20px",
            borderRadius: "16px",
            border: "none",

            background:
              videoCompleted
                ? "linear-gradient(to right,#8b5cf6,#38bdf8)"
                : "#334155",

            color: "white",
            fontSize: "20px",
            fontWeight: "bold",

            cursor:
              videoCompleted
                ? "pointer"
                : "not-allowed",

            opacity:
              videoCompleted
                ? 1
                : 0.7,
          }}
        >
          {videoCompleted
            ? "Register for ₹99"
            : "🔒 Complete Video to Register"}
        </button>

        {/* BENEFITS */}

        <div
          style={{
            marginTop: "55px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "18px",
          }}
        >
          {[
            "🤖 AI Skills",
            "💼 Digital Business",
            "📈 Marketing Skills",
            "🚀 Practical Mentorship",
          ].map((item) => (
            <div
              key={item}
              style={{
                padding: "25px 15px",
                borderRadius: "18px",
                background:
                  "rgba(255,255,255,0.05)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                color: "#e2e8f0",
                fontWeight: "600",
              }}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* FORM POPUP */}

      {showForm && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.82)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "500px",
              background: "#0f172a",
              borderRadius: "25px",
              padding: "30px",
              border:
                "1px solid rgba(255,255,255,0.1)",
              boxSizing: "border-box",
            }}
          >

            <h2
              style={{
                textAlign: "center",
                fontSize: "30px",
                marginBottom: "10px",
              }}
            >
              Register Now
            </h2>

            <p
              style={{
                textAlign: "center",
                color: "#94a3b8",
                marginBottom: "30px",
              }}
            >
              Enter your details to continue.
            </p>

            <form
              onSubmit={handleRegister}
            >

              {/* NAME */}

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                style={inputStyle}
              />

              {/* PHONE */}

              <input
                type="tel"
                placeholder="WhatsApp / Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                style={inputStyle}
              />

              {/* PAYMENT */}

              <button
                type="submit"
                disabled={loading}
                style={{
                  ...joinBtn,
                  opacity:
                    loading ? 0.7 : 1,
                  cursor:
                    loading
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {loading
                  ? "Opening Payment..."
                  : "Continue to ₹99 Payment"}
              </button>
            </form>

            <button
              disabled={loading}
              onClick={() =>
                setShowForm(false)
              }
              style={closeBtn}
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* FOOTER */}

      <div
        style={{
          textAlign: "center",
          marginTop: "70px",
          color: "#64748b",
          fontSize: "14px",
        }}
      >
        © 2026 Support & Growth
        <br />
        Learn • Earn • Grow
      </div>

    </div>
  );
}

// =====================================================
// STYLES
// =====================================================

const joinBtn = {
  width: "100%",
  padding: "17px",
  borderRadius: "14px",
  border: "none",
  background:
    "linear-gradient(to right,#8b5cf6,#38bdf8)",
  color: "white",
  fontSize: "18px",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "17px",
  marginBottom: "16px",
  borderRadius: "12px",
  border:
    "1px solid rgba(255,255,255,0.1)",
  outline: "none",
  background:
    "rgba(255,255,255,0.05)",
  color: "white",
  fontSize: "16px",
};

const closeBtn = {
  width: "100%",
  padding: "14px",
  marginTop: "12px",
  borderRadius: "12px",
  border:
    "1px solid rgba(255,255,255,0.15)",
  background: "transparent",
  color: "#cbd5e1",
  fontSize: "16px",
};

export default SgConfirmationPage;