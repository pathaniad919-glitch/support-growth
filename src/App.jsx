import Training from "./Training";
import Admin from "./Admin";
import { auth, db } from "./firebase";
import SgConfirmationPage from "./SgConfirmationPage";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp,
  getDoc,
  setDoc
} from "firebase/firestore";

import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useParams
} from "react-router-dom";
function Home() {
  const [selectedPlan, setSelectedPlan] =
    useState(null);
    const [topEarners, setTopEarners] =
  useState({
    project1: "₹0",
    project2: "₹0",
    project3: "₹0",
  });

  const isLoggedIn =
    localStorage.getItem("loggedIn") ===
    "true";
    useEffect(() => {

  const fetchTopEarners = async () => {

    const docRef = doc(
      db,
      "topEarners",
      "today"
    );

    const docSnap =
      await getDoc(docRef);

    if (docSnap.exists()) {

      setTopEarners(
        docSnap.data()
      );

    }

  };

  fetchTopEarners();

}, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
        color: "white",
      }}
    >
      {/* VIDEO */}
      <video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  style={{
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    top: 0,
    left: 0,
    zIndex: -2,
  }}
>
  <source
    src="/bgvideo.mp4"
    type="video/mp4"
  />
</video>

      {/* OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "rgba(0,0,0,0.75)",
          zIndex: -1,
        }}
      />

      {/* NAVBAR */}

<nav
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px 20px",
    textAlign: "center",
    gap: "25px",
  }}
>

  {/* LOGO + TITLE */}

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src="/logo.png"
      alt="logo"
      style={{
        width: "240px",
        marginBottom: "20px",
        objectFit: "contain",
      }}
    />

    <h1
      style={{
        margin: 0,
        fontSize:
  window.innerWidth < 768
    ? "42px"
    : "70px",
        fontWeight: "bold",
        lineHeight: "1.1",
        textAlign: "center",
      }}
    >
      SUPPORT & GROWTH
    </h1>

    <p
      style={{
        marginTop: "10px",
        fontSize: "24px",
        color: "#d1d5db",
        letterSpacing: "2px",
      }}
    >
      LEARN • EARN • GROW
    </p>
  </div>

  {/* MENU */}

  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "25px",
      flexWrap: "wrap",
    }}
  >
    <a href="#courses" style={menuStyle}>
      Courses
    </a>

    <a href="#pricing" style={menuStyle}>
      Pricing
    </a>

    <a href="#reviews" style={menuStyle}>
      Reviews
    </a>

    {!isLoggedIn ? (
      <Link to="/login">
        <button style={loginBtn}>
          Login
        </button>
      </Link>
    ) : (
      <Link to="/dashboard">
        <button style={loginBtn}>
          Dashboard
        </button>
      </Link>
    )}
  </div>

</nav>
<div
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "60px 20px",
  }}
>

  <h1
    style={{
      fontSize:
  window.innerWidth < 768
    ? "55px"
    : "95px",
      lineHeight: "1.1",
      fontWeight: "bold",
      maxWidth: "1000px",
      marginBottom: "30px",
    }}
  >
    Build Your Future
    <br />
    With AI &
    <br />
    Business Skills
  </h1>

  <p
    style={{
      fontSize: "28px",
      color: "#d1d5db",
      maxWidth: "900px",
      lineHeight: "1.8",
    }}
  >
    Learn AI, Branding,
    Dropshipping, Freelancing,
    Marketing and Business Growth
    through premium mentorship.
  </p>

  {!isLoggedIn ? (
    <button
  style={joinBtn}
  onClick={() => {
    alert(
      "Registration Link Available Through Invitation Only"
    );
  }}
>
  Start Learning
</button>
  ) : (
    <Link to="/dashboard">
      <button style={joinBtn}>
        Open Dashboard
      </button>
    </Link>
  )}

</div>
{/* TOP EARNERS */}

<section
  style={{
    padding:
      window.innerWidth < 768
        ? "80px 20px"
        : "120px 60px",
  }}
>

  <h2
    style={{
      textAlign: "center",
      fontSize: "55px",
      marginBottom: "20px",
    }}
  >
    Yesterday Top Earners 🚀
  </h2>

  <p
    style={{
      textAlign: "center",
      color: "#cbd5e1",
      marginBottom: "50px",
      fontSize: "20px",
    }}
  >
    Live project participants earnings
  </p>

  <div
    style={{
      display: "grid",
      gridTemplateColumns:
        "repeat(auto-fit,minmax(300px,1fr))",
      gap: "30px",
    }}
  >

    <div style={courseCard}>

      <h1
        style={{
          fontSize: "55px",
          color: "#22c55e",
        }}
      >
        {topEarners.project1}
      </h1>

      <h2>
  {topEarners.project1Name}
</h2>

<p
  style={{
    color: "#94a3b8",
    marginBottom: "10px",
  }}
>
  📍 {topEarners.project1City}
</p>

      <p
        style={{
          color: "#cbd5e1",
          lineHeight: "1.8",
        }}
      >
        Video Editing and Website Design earnings.
      </p>

    </div>

    <div style={courseCard}>

      <h1
        style={{
          fontSize: "55px",
          color: "#38bdf8",
        }}
      >
        {topEarners.project2}
      </h1>

      <h2>
  {topEarners.project2Name}
</h2>

<p
  style={{
    color: "#94a3b8",
    marginBottom: "10px",
  }}
>
  📍 {topEarners.project2City}
</p>

      <p
        style={{
          color: "#cbd5e1",
          lineHeight: "1.8",
        }}
      >
        Social Media Handling and Digital Product earnings.
      </p>

    </div>

    <div style={courseCard}>

      <h1
        style={{
          fontSize: "55px",
          color: "#facc15",
        }}
      >
        {topEarners.project3}
      </h1>

      <h2>
  {topEarners.project3Name}
</h2>

<p
  style={{
    color: "#94a3b8",
    marginBottom: "10px",
  }}
>
  📍 {topEarners.project3City}
</p>

      <p
        style={{
          color: "#cbd5e1",
          lineHeight: "1.8",
        }}
      >
        Advanced mentorship and premium business earnings.
      </p>

    </div>

  </div>

</section>
      {/* COURSES */}
      <section
        id="courses"
        style={{
          padding:
  window.innerWidth < 768
    ? "80px 20px"
    : "120px 60px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "55px",
            marginBottom: "20px",
          }}
        >
          Premium Projects
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "35px",
          }}
        >
          {[
            [
  {
    icon: "🎬",
    title: "Project 1",
    desc:
      "Video Editing Basic to Advance + Website Design Basic to Advance",
  },

  {
    icon: "💻",
    title: "Project 2",
    desc:
      "Video Editing, Website Design, Digital Products and Social Media Handling",
  },

  {
    icon: "🚀",
    title: "Project 3",
    desc:
      "All Premium Skills + One To One Support + Online Workshops + Advanced Mentorship",
  },
]
          ].map((course) => (
            <div
              key={course.title}
              style={courseCard}
            >
              <div
                style={{
                  fontSize: "70px",
                  marginBottom: "20px",
                }}
              >
                {course.icon}
              </div>

              <h2>{course.title}</h2>

              <p
                style={{
                  color: "#d1d5db",
                  lineHeight: "1.8",
                }}
              >
                {course.desc}
              </p>

              {!isLoggedIn && (
                <div
                  style={{
                    marginTop: "20px",
                    background:
                      "rgba(239,68,68,0.15)",
                    padding: "12px",
                    borderRadius: "12px",
                    color: "#fca5a5",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  🔒 Signup Required
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
{isLoggedIn && (
  <section
    id="pricing"
    style={{
      padding: "0 60px 120px",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        fontSize: "55px",
        marginBottom: "20px",
      }}
    >
      Membership Plans
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(320px,1fr))",
        gap: "35px",
      }}
    >
      {[
        {
  plan: "Project 1",
  price: "₹999",
  reason:
    "Video Editing Basic to Advance and Website Design Basic to Advance.",
},

{
  plan: "Project 2",
  price: "₹2999",
  reason:
    "Video Editing, Website Design, Digital Products and Social Media Handling.",
},

{
  plan: "Project 3",
  price: "₹9999",
  reason:
    "All Premium Skills, 1-to-1 Support, Online Workshops and Advanced Mentorship.",
},
      ].map((item) => (
        <div
          key={item.plan}
          style={courseCard}
        >
          <h2>{item.plan}</h2>

          <h1
            style={{
              fontSize: "60px",
            }}
          >
            {item.price}
          </h1>

          <p
            style={{
              color: "#d1d5db",
              lineHeight: "1.8",
              marginBottom: "25px",
            }}
          >
            {item.reason}
          </p>

          <button
            style={joinBtn}
            onClick={() =>
              setSelectedPlan(item)
            }
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>

    {/* PAYMENT POPUP */}
    {selectedPlan && (
      <div
        style={{
          position: "fixed",
          inset: 0,
          background:
            "rgba(0,0,0,0.7)",
          display: "flex",
          justifyContent:
            "center",
          alignItems: "center",
          zIndex: 999,
        }}
      >
        <div
          style={{
            width: "450px",
            background: "#0f172a",
            padding: "40px",
            borderRadius: "24px",
            border:
              "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h1>
            {selectedPlan.plan} Plan
          </h1>

          <p
            style={{
              color: "#d1d5db",
              lineHeight: "1.8",
              marginTop: "15px",
            }}
          >
            Payment gateway integration
            will be added here later.
          </p>

          <button
            style={joinBtn}
            onClick={() =>
              setSelectedPlan(null)
            }
          >
            Close
          </button>
        </div>
      </div>
    )}
  </section>
)}

      {/* REVIEWS */}
      <section
        id="reviews"
        style={{
          padding: "0 60px 120px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "55px",
            marginBottom: "20px",
          }}
        >
          Student Success Stories
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(320px,1fr))",
            gap: "35px",
          }}
        >
          {[
            {
              name: "Rahul Sharma",
              result:
                "Started earning ₹80,000/month freelancing using AI tools.",
            },

            {
              name: "Aman Verma",
              result:
                "Scaled ecommerce business to ₹5 lakh monthly revenue.",
            },

            {
              name: "Simran Kaur",
              result:
                "Built a successful Instagram brand and collaborations.",
            },

            {
              name: "Rohit Bansal",
              result:
                "Created multiple digital income streams.",
            },
          ].map((review) => (
            <div
              key={review.name}
              style={courseCard}
            >
              <h3>{review.name}</h3>

              <p
                style={{
                  color: "#e2e8f0",
                  lineHeight: "1.9",
                }}
              >
                “{review.result}”
              </p>
            </div>
          ))}
        </div>
      </section>

<section
  id="about"
  style={{
    padding: "0 60px 120px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "55px",
      marginBottom: "25px",
    }}
  >
    About Us
  </h2>

  <div style={courseCard}>
    <p
      style={{
        color: "#d1d5db",
        lineHeight: "2",
        fontSize: "18px",
      }}
    >
      Support & Growth is a premium
      learning and mentorship platform
      focused on helping students,
      freelancers, entrepreneurs and
      creators build modern digital
      income skills.

      <br /><br />

      Our mission is to help people
      learn AI tools, branding,
      freelancing, dropshipping,
      marketing psychology and
      business growth strategies
      through practical mentorship
      and real-world systems.

      <br /><br />

      We believe education should
      create financial freedom,
      confidence and long-term growth.
      Our platform is designed to help
      individuals build skills that
      are relevant in the modern
      digital economy.
    </p>
  </div>
</section>

{/* CONTACT US */}

<section
  id="contact"
  style={{
    padding: "0 60px 120px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "55px",
      marginBottom: "25px",
    }}
  >
    Contact Us
  </h2>

  <div style={courseCard}>
    <p
      style={{
        color: "#d1d5db",
        lineHeight: "2",
        fontSize: "18px",
      }}
    >
      Support & Growth
      <br /><br />

      Email:
      supportandgrowth@gmail.com

      <br /><br />

      Business Hours:
      Monday - Saturday
      10:00 AM to 7:00 PM

      <br /><br />

      For support, payment assistance,
      account approval or business
      inquiries, feel free to contact
      us through email.
    </p>
  </div>
</section>

{/* PRIVACY POLICY */}

<section
  id="privacy"
  style={{
    padding: "0 60px 120px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "55px",
      marginBottom: "25px",
    }}
  >
    Privacy Policy
  </h2>

  <div style={courseCard}>
    <p
      style={{
        color: "#d1d5db",
        lineHeight: "2",
        fontSize: "18px",
      }}
    >
      We respect your privacy and are
      committed to protecting your
      personal information.

      <br /><br />

      Support & Growth may collect
      user information such as name,
      email address and payment
      details for account access,
      communication and service
      improvement purposes.

      <br /><br />

      We do not sell or share personal
      user data with unauthorized
      third parties.

      <br /><br />

      By using this website, users
      agree to our data usage,
      educational services and
      communication policies.
    </p>
  </div>
</section>

{/* REFUND POLICY */}

<section
  id="refund"
  style={{
    padding: "0 60px 120px",
  }}
>
  <h2
    style={{
      textAlign: "center",
      fontSize: "55px",
      marginBottom: "25px",
    }}
  >
    Refund Policy
  </h2>

  <div style={courseCard}>
    <p
      style={{
        color: "#d1d5db",
        lineHeight: "2",
        fontSize: "18px",
      }}
    >
      Due to the digital nature of our
      products, mentorship programs
      and educational content, all
      payments are generally non-
      refundable.

      <br /><br />

      However, refund requests may be
      reviewed in special cases where
      technical issues or accidental
      duplicate payments occur.

      <br /><br />

      Users are encouraged to contact
      our support team before making
      any payment-related dispute.
    </p>
  </div>
</section>
    </div>
  );
}
/* INTRO VIDEO PAGE */

function IntroPage() {

  const [showForm, setShowForm] =
    useState(false);

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");
    const [showPayment, setShowPayment] =
  useState(false);
  const [submittedUser, setSubmittedUser] =
  useState(null);

  const handleRegister = async () => {

    if (
      !name ||
      !phone ||
      !email
    ) {
      alert("Please fill all fields");
      return;
    }

    try {

      await addDoc(
        collection(
          db,
          "introRegistrations"
        ),
        {
          name,
          phone,
          email,
          createdAt:
            serverTimestamp(),
        }
      );

      setSubmittedUser({
  name,
  phone,
  email,
});

setShowForm(false);

setShowPayment(true);

    } catch (error) {

      alert(error.message);

    }
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#020617,#050816,#0f172a)",
        color: "white",
        position: "relative",
        overflow: "hidden",
        padding:
          window.innerWidth < 768
            ? "30px 20px"
            : "60px",
      }}
    >

      {/* GLOW EFFECTS */}

      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "999px",
          background:
            "rgba(139,92,246,0.25)",
          filter: "blur(120px)",
          top: "-120px",
          left: "-120px",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "999px",
          background:
            "rgba(56,189,248,0.18)",
          filter: "blur(120px)",
          bottom: "-120px",
          right: "-120px",
        }}
      />

      {/* MAIN CONTENT */}

      <div
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: "1300px",
          margin: "0 auto",
        }}
      >

        {/* TOP BADGE */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >

          <div
            style={{
              background:
                "rgba(255,255,255,0.08)",
              border:
                "1px solid rgba(255,255,255,0.08)",
              padding: "12px 22px",
              borderRadius: "999px",
              fontSize: "15px",
              backdropFilter:
                "blur(10px)",
            }}
          >
            🚀 Premium Mentorship Platform
          </div>

        </div>

        {/* HERO TITLE */}

        <h1
          style={{
            textAlign: "center",
            fontSize:
              window.innerWidth < 768
                ? "52px"
                : "95px",
            lineHeight: "1",
            fontWeight: "800",
            marginBottom: "30px",
          }}
        >
          Build Your
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
            Dream Future
          </span>
        </h1>

        {/* SUBTEXT */}

        <p
          style={{
            textAlign: "center",
            color: "#cbd5e1",
            fontSize:
              window.innerWidth < 768
                ? "18px"
                : "24px",
            maxWidth: "900px",
            margin: "0 auto",
            lineHeight: "1.9",
            marginBottom: "60px",
          }}
        >
          Learn AI, Branding,
          Freelancing, Digital Business,
          Dropshipping and High Income
          Skills through our premium
          mentorship ecosystem.
        </p>

        {/* VIDEO CARD */}

        <div
          style={{
            background:
              "rgba(255,255,255,0.06)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "35px",
            padding:
              window.innerWidth < 768
                ? "18px"
                : "30px",
            backdropFilter:
              "blur(14px)",
            boxShadow:
              "0 0 60px rgba(139,92,246,0.2)",
            marginBottom: "50px",
          }}
        >

          <iframe
  width="100%"
  height="700"
  src="https://www.youtube.com/embed/zeGZ3HayuK8"
  title="Intro Video"
  frameBorder="0"
  allowFullScreen
  style={{
    borderRadius: "24px",
  }}
/>

        </div>

        {/* CTA */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >

          <button
            onClick={() =>
              setShowForm(true)
            }
            style={{
              padding:
                "20px 55px",
              borderRadius: "18px",
              border: "none",
              background:
                "linear-gradient(to right,#8b5cf6,#38bdf8)",
              color: "white",
              fontSize: "22px",
              fontWeight: "bold",
              cursor: "pointer",
              boxShadow:
                "0 0 35px rgba(139,92,246,0.4)",
            }}
          >
            Join Premium Access
          </button>

        </div>

        {/* TRUST */}

        <div
          style={{
            marginTop: "70px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(220px,1fr))",
            gap: "25px",
          }}
        >

          {[
            "AI Skills",
            "Business Mentorship",
            "Freelancing",
            "Digital Income",
          ].map((item) => (

            <div
              key={item}
              style={{
                background:
                  "rgba(255,255,255,0.05)",
                border:
                  "1px solid rgba(255,255,255,0.08)",
                padding: "30px",
                borderRadius: "24px",
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              ✨ {item}
            </div>

          ))}

        </div>

      </div>

      {/* POPUP FORM */}

      {showForm && (

        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.75)",
            display: "flex",
            justifyContent:
              "center",
            alignItems: "center",
            zIndex: 999,
            padding: "20px",
          }}
        >

          <div
            style={{
              width: "100%",
              maxWidth: "520px",
              background:
                "#0f172a",
              padding: "40px",
              borderRadius: "30px",
              border:
                "1px solid rgba(255,255,255,0.08)",
            }}
          >

            <h1
              style={{
                marginBottom: "25px",
                textAlign: "center",
              }}
            >
              Register Now
            </h1>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              style={inputStyle}
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={inputStyle}
            />

            <button
              style={joinBtn}
              onClick={handleRegister}
            >
              Submit Registration
            </button>

            <button
              style={secondaryBtn}
              onClick={() =>
                setShowForm(false)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}
      {/* PAYMENT POPUP */}

{showPayment && (

  <div
    style={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
      padding: "20px",
    }}
  >

    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        background: "#0f172a",
        padding: "40px",
        borderRadius: "30px",
        textAlign: "center",
        border:
          "1px solid rgba(255,255,255,0.08)",
      }}
    >

      <h1
        style={{
          marginBottom: "20px",
        }}
      >
        Pay Registration Fee
      </h1>

      <p
        style={{
          color: "#cbd5e1",
          lineHeight: "1.8",
          marginBottom: "25px",
        }}
      >
        Scan QR and pay ₹99 to continue
        your premium registration.
      </p>

      <img
        src="/scanner.jpeg"
        alt="scanner"
        style={{
          width: "280px",
          borderRadius: "20px",
          marginBottom: "25px",
        }}
      />

      <h2
        style={{
          color: "#38bdf8",
          marginBottom: "25px",
        }}
      >
        Registration Fee: ₹99
      </h2>

      <button
        style={joinBtn}
        onClick={async () => {

          await addDoc(
            collection(
              db,
              "paymentRequests"
            ),
            {
              ...submittedUser,
              paymentStatus:
                "pending",
              createdAt:
                serverTimestamp(),
            }
          );

          alert(
            "Payment Request Submitted Successfully"
          );

          setShowPayment(false);

        }}
      >
        I Have Paid
      </button>

    </div>

  </div>

)}

    </div>
  );
}

function PremiumAccessPage() {
  const { code } = useParams();

  const [timeLeft, setTimeLeft] =
    useState(1200); // 20 minutes

  const [expired, setExpired] =
    useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setExpired(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (expired) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#050816",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <img
          src="/logo.png"
          alt="S&G Logo"
          style={{
            width: "180px",
            marginBottom: "25px",
          }}
        />

        <h1
          style={{
            fontSize:
              window.innerWidth < 768
                ? "40px"
                : "60px",
          }}
        >
          Access Expired
        </h1>

        <p
          style={{
            color: "#cbd5e1",
            fontSize:
              window.innerWidth < 768
                ? "18px"
                : "22px",
            marginTop: "15px",
          }}
        >
          This premium access session has ended.
        </p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg,#020617,#0f172a,#111827)",
        color: "white",
        padding:
          window.innerWidth < 768
            ? "20px"
            : "40px",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src="/logo.png"
          alt="S&G Logo"
          style={{
            width:
              window.innerWidth < 768
                ? "180px"
                : "240px",
          }}
        />
      </div>

      {/* HEADING */}
      <h1
        style={{
          textAlign: "center",
          fontSize:
            window.innerWidth < 768
              ? "36px"
              : "70px",
          marginBottom: "15px",
          fontWeight: "800",
          lineHeight: "1.2",
        }}
      >
        Build Your Future With S&G 🚀
      </h1>

      {/* TRUST TEXT */}
      <p
        style={{
          textAlign: "center",
          color: "#cbd5e1",
          fontSize:
            window.innerWidth < 768
              ? "16px"
              : "20px",
          marginBottom: "25px",
          lineHeight: "1.8",
        }}
      >
        Trusted by 500+ learners • Premium Mentorship • Real Earning Systems
      </p>

      {/* SECURE BADGE */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#22c55e",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        🔒 Secure Premium Access Verified
      </div>

      {/* TIMER */}
      <h2
        style={{
          textAlign: "center",
          color: "#38bdf8",
          marginBottom: "35px",
          fontSize:
            window.innerWidth < 768
              ? "20px"
              : "28px",
        }}
      >
        Time Left:{" "}
        {Math.floor(timeLeft / 60)}:
        {String(timeLeft % 60).padStart(
          2,
          "0"
        )}
      </h2>

       {/* VIDEO CARD */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          background:
            "rgba(255,255,255,0.05)",
          padding:
            window.innerWidth < 768
              ? "15px"
              : "25px",
          borderRadius: "25px",
          backdropFilter: "blur(12px)",
          border:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingTop: "56.25%",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <iframe
  src="https://www.youtube.com/embed/FkKFAqCCDbU?modestbranding=1&rel=0"
  title="Premium Training"
  frameBorder="0"
  allow="autoplay; fullscreen"
  allowFullScreen
  style={{
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "20px",
  }}
/>
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          textAlign: "center",
          marginTop: "30px",
          color: "#94a3b8",
          fontSize: "16px",
        }}
      >
        © 2026 Support & Growth | Learn • Earn • Grow
      </div>
    </div>
  );
}

/* LOGIN */

function Login() {
  
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

    const adminEmail = "admin@gmail.com";
const adminPassword = "123456";

  const handleLogin = async () => {

  // ADMIN LOGIN
  if (
    email.trim() === adminEmail &&
    password.trim() === adminPassword
  ) {

    localStorage.setItem(
      "adminLoggedIn",
      "true"
    );

    localStorage.setItem(
      "loggedIn",
      "true"
    );

    navigate("/admin");

    return;
  }

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const querySnapshot =
      await getDocs(
        collection(db, "users")
      );

    let approvedUser = null;

    querySnapshot.forEach((docItem) => {

      const data = docItem.data();

      if (data.email === email) {

        approvedUser = {
          id: docItem.id,
          ...data,
        };
      }
    });

    if (!approvedUser) {

  alert("User not found");

  return;
}

    if (approvedUser.status !== "approved") {

  alert(
    "Waiting for admin approval"
  );

  return;
}

    localStorage.setItem(
      "loggedIn",
      "true"
    );

    localStorage.setItem(
      "user",
      JSON.stringify(approvedUser)
    );

    navigate("/dashboard");

  } catch (error) {

    alert(error.message);

  }
};
  return (
    <div style={authContainer}>
      <div style={authCard}>
        <h1 style={authHeading}>
          Welcome Back
        </h1>

        <p style={authText}>
          Access your premium dashboard and
          courses.
        </p>

        <input
          placeholder="Email Address"
          style={inputStyle}
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          placeholder="Password"
          type="password"
          style={inputStyle}
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          style={joinBtn}
          onClick={handleLogin}
        >
          Access Dashboard
        </button>

        <Link to="/signup">
          <button style={secondaryBtn}>
            Create Account
          </button>
        </Link>
      </div>
    </div>
  );
}

/* SIGNUP */

function Signup() {

  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSignup = async () => {

    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === ""
    ) {

      alert("Please fill all fields");

      return;
    }

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await addDoc(
  collection(db, "users"),
  {
    name,
    email,
    status: "pending",
    dailyLearning: "0 Hours",
    dailyEarning: "₹0",

    projects: {
  project1: false,
  project2: false,
  project3: false,
},
  }
);

      alert(
        "Signup successful. Wait for admin approval."
      );

      navigate("/login");

    } catch (error) {

      alert(error.message);

    }
  };

  return (
    <div style={authContainer}>
      <div style={authCard}>

        <h1 style={authHeading}>
          Create Account
        </h1>

        <p style={authText}>
          Create your account to unlock
          premium dashboard access.
        </p>

        <input
          type="text"
          placeholder="Full Name"
          style={inputStyle}
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="email"
          placeholder="Email Address"
          style={inputStyle}
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Create Password"
          style={inputStyle}
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          style={joinBtn}
          onClick={handleSignup}
        >
          Create Premium Account
        </button>

        <Link to="/login">
          <button style={secondaryBtn}>
            Login
          </button>
        </Link>

      </div>
    </div>
  );
}

/* DASHBOARD */

function Dashboard() {
  const navigate = useNavigate();

  const isLoggedIn =
  localStorage.getItem("loggedIn") === "true";

  const user = JSON.parse(
    localStorage.getItem("user")
  );
  const [courseCode, setCourseCode] =
  useState("");

const [selectedCourse, setSelectedCourse] =
  useState("");

const coursesData = [
  {
    icon: "🎬",
    title: "Project 1",
    progress: "25%",
    key: "project1",
    unlockCode: "PROJECT100",

    price: "₹999",

    description:
      "Video Editing Basic to Advance + Website Design Basic to Advance",
  },

  {
    icon: "💻",
    title: "Project 2",
    progress: "60%",
    key: "project2",
    unlockCode: "PROJECT200",

    price: "₹2999",

    description:
      "Video Editing, Website Design, Digital Products and Social Media Handling",
  },

  {
    icon: "🚀",
    title: "Project 3",
    progress: "100%",
    key: "project3",
    unlockCode: "PROJECT300",

    price: "₹9999",

    description:
      "All Premium Skills + One To One Support + Online Workshops + Advanced Mentorship",
  },
];

  /* PROTECTED ROUTE */
  if (!isLoggedIn || !user) {
  return <Navigate to="/login" />;
}

  const handleLogout = async () => {
    await signOut(auth);
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("adminLoggedIn");
  localStorage.removeItem("user");

  navigate("/");
  window.location.reload();
};
  return (
    <div
      style={{
        background: "#050816",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "52px",
            }}
          >
            Welcome Back, {user?.name} 🚀
          </h1>

          <p
            style={{
              color: "#d1d5db",
            }}
          >
            Track your learning and growth.
          </p>
        </div>

        <button
          onClick={handleLogout}
          style={loginBtn}
        >
          Logout
        </button>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "25px",
          marginBottom: "50px",
        }}
      >
        <div style={dashboardCard}>
          <h2>📚 Daily Learning</h2>

          <p
            style={{
              fontSize: "34px",
              color: "#38bdf8",
            }}
          >
            {user?.dailyLearning}
          </p>
        </div>

        <div style={dashboardCard}>
          <h2>💰 Daily Earning</h2>

          <p
            style={{
              fontSize: "34px",
              color: "#4ade80",
            }}
          >
            {user?.dailyEarning}
          </p>
        </div>

        <div style={dashboardCard}>
          <h2>🔥 Courses Access</h2>

          <p
            style={{
              fontSize: "34px",
              color: "#facc15",
            }}
          >
            3 Projects
          </p>
        </div>
      </div>

      {/* COURSES */}
      <h1
        style={{
          marginBottom: "30px",
          fontSize: "42px",
        }}
      >
        Your Premium Projects
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "30px",
        }}
      >
        {coursesData.map((course) => {

  const unlocked =
  user?.projects?.[course.key];

  return (

    <div
      key={course.title}
      style={dashboardCard}
    >

      <div
        style={{
          fontSize: "60px",
          marginBottom: "20px",
        }}
      >
        {course.icon}
      </div>

      <h2>{course.title}</h2>

      <p
        style={{
          color: "#cbd5e1",
          lineHeight: "1.8",
          marginTop: "10px",
        }}
      >
        {course.description}
        <h2
  style={{
    color: "#38bdf8",
    marginTop: "15px",
  }}
>
  {course.price}
</h2>
      </p>

      <div
        style={{
          marginTop: "15px",
          marginBottom: "15px",
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            marginBottom: "8px",
          }}
        >
          <span>Progress</span>

          <span>
            {unlocked
              ? course.progress
              : "Locked"}
          </span>

        </div>

        <div
          style={{
            width: "100%",
            height: "10px",
            borderRadius: "20px",
            background:
              "rgba(255,255,255,0.1)",
          }}
        >

          <div
            style={{
              width: unlocked
                ? course.progress
                : "0%",
              height: "10px",
              borderRadius: "20px",
              background:
                "linear-gradient(to right,#8b5cf6,#38bdf8)",
            }}
          />

        </div>

      </div>

      {!unlocked ? (

        <button
          style={{
            ...joinBtn,
            background: "#ef4444",
          }}
          onClick={() => {

            const enteredCode =
              prompt(
                "Enter Premium Project Code"
              );

            if (
              enteredCode ===
              course.unlockCode
            ) {

              alert(
                "Course Unlocked Successfully"
              );

            } else {

              alert(
                "Only Elite Users Can Access"
              );

            }

          }}
        >
          🔒 Locked Project
        </button>

      ) : (

        <button style={joinBtn}>
          Watch Course
        </button>

      )}

    </div>

  );

})}
      </div>
    </div>
  );
}
/* PASTE ADMIN PANEL HERE */

function AdminPanel() {

  const navigate = useNavigate();

  const adminLoggedIn =
    localStorage.getItem("adminLoggedIn");

  if (adminLoggedIn !== "true") {
    return <Navigate to="/login" />;
  }

  const [users, setUsers] = useState([]);
  const [introUsers, setIntroUsers] =
  useState([]);
  const [paymentRequests, setPaymentRequests] =
  useState([]);
  const [courseCode, setCourseCode] =
  useState("");

const [selectedUser, setSelectedUser] =
  useState(null);
  const [project1Earning, setProject1Earning] =
  useState("");

const [project2Earning, setProject2Earning] =
  useState("");

const [project3Earning, setProject3Earning] =
  useState("");
  const [project1Name, setProject1Name] =
  useState("");

const [project1City, setProject1City] =
  useState("");

const [project2Name, setProject2Name] =
  useState("");

const [project2City, setProject2City] =
  useState("");

const [project3Name, setProject3Name] =
  useState("");

const [project3City, setProject3City] =
  useState("");
  const updateTopEarners = async () => {
  try {
    await setDoc(
      doc(db, "topEarners", "today"),
      {
        project1: project1Earning,
        project1Name,
        project1City,

        project2: project2Earning,
        project2Name,
        project2City,

        project3: project3Earning,
        project3Name,
        project3City,
      }
    );

    alert("Top Earners Updated");
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};
  const generatePremiumLink = async () => {
  const randomCode = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  await setDoc(
    doc(db, "premiumLinks", randomCode),
    {
      used: false,
      createdAt: serverTimestamp(),
    }
  );

  const finalLink =
    `${window.location.origin}/premium-access/${randomCode}`;

  prompt("Copy this premium link:", finalLink);
};
useEffect(() => {

  const fetchUsers = async () => {

    const querySnapshot =
      await getDocs(
        collection(db, "users")
      );

    const usersData = [];

    querySnapshot.forEach((docItem) => {

      usersData.push({
        id: docItem.id,
        ...docItem.data(),
      });

    });

    setUsers(usersData);
    const introSnapshot =
  await getDocs(
    collection(
      db,
      "introRegistrations"
    )
  );

const introData = [];

introSnapshot.forEach((docItem) => {

  introData.push({
    id: docItem.id,
    ...docItem.data(),
  });

});

setIntroUsers(introData);
const paymentSnapshot =
  await getDocs(
    collection(
      db,
      "paymentRequests"
    )
  );

const paymentData = [];

paymentSnapshot.forEach((docItem) => {

  paymentData.push({
    id: docItem.id,
    ...docItem.data(),
  });

});

setPaymentRequests(paymentData);
  };

  fetchUsers();

}, []);

  const handleLogout = () => {
    localStorage.removeItem(
      "adminLoggedIn"
    );

    navigate("/login");
  };
const pendingUsers = users.filter(
  (user) => user.status === "pending"
);

const approvedUsers = users.filter(
  (user) => user.status === "approved"
);
  return (
    <div
      style={{
        background: "#050816",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "50px",
            }}
          >
            Admin Panel 👑
          </h1>

          <p
            style={{
              color: "#cbd5e1",
            }}
          >
            Full Website Control
          </p>
          <button
  style={{
    ...joinBtn,
    marginTop: "20px",
    width: "300px",
  }}
  onClick={generatePremiumLink}
>
  Generate Premium Link
</button>
        </div>

        <button
          onClick={handleLogout}
          style={loginBtn}
        >
          Logout
        </button>
      </div>
<div
  style={{
    ...dashboardCard,
    marginBottom: "40px",
  }}
>

  <h1
    style={{
      marginBottom: "25px",
    }}
  >
    Update Top Earners
  </h1>

  <input
    type="text"
    placeholder="Project 1 Earning"
   value={project1Earning}
    onChange={(e) =>
      setProject1Earning(e.target.value)
    }
    style={inputStyle}
  />
  <input
  type="text"
  placeholder="Project 1 Name"
  value={project1Name}
  onChange={(e) =>
    setProject1Name(e.target.value)
  }
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Project 1 City"
  value={project1City}
  onChange={(e) =>
    setProject1City(e.target.value)
  }
  style={inputStyle}
/>

  <input
    type="text"
    placeholder="Project 2 Earning"
    value={project2Earning}
    onChange={(e) =>
      setProject2Earning(e.target.value)
    }
    style={inputStyle}
  />
  <input
  type="text"
  placeholder="Project 2 Name"
  value={project2Name}
  onChange={(e) =>
    setProject2Name(e.target.value)
  }
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Project 2 City"
  value={project2City}
  onChange={(e) =>
    setProject2City(e.target.value)
  }
  style={inputStyle}
/>

  <input
    type="text"
    placeholder="Project 3 Earning"
    value={project3Earning}
    onChange={(e) =>
      setProject3Earning(e.target.value)
    }
    style={inputStyle}
  />
  <input
  type="text"
  placeholder="Project 3 Name"
  value={project3Name}
  onChange={(e) =>
    setProject3Name(e.target.value)
  }
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Project 3 City"
  value={project3City}
  onChange={(e) =>
    setProject3City(e.target.value)
  }
  style={inputStyle}
/>

  <button
  style={joinBtn}
  onClick={() => {
    alert("Button clicked");
    updateTopEarners();
  }}
>
  Update Homepage Earnings
</button>

</div>
      <div>
<h1
  style={{
    marginBottom: "25px",
    fontSize: "40px",
  }}
>
  Intro Registrations
</h1>

{introUsers.map((item) => (

  <div
    key={item.id}
    style={{
      ...dashboardCard,
      marginBottom: "25px",
    }}
  >

    <h2>{item.name}</h2>

    <p>{item.phone}</p>

    <p>{item.email}</p>
    <p
  style={{
    marginTop: "10px",
    color: item.payment
      ? "#22c55e"
      : "#ef4444",
    fontWeight: "bold",
  }}
>
  {item.payment
    ? "✅ Payment Submitted"
    : "❌ Payment Pending"}
</p>

  </div>

))}
<h1
  style={{
    marginTop: "50px",
    marginBottom: "25px",
  }}
>
  Payment Requests
</h1>

{paymentRequests.map((item) => (

  <div
    key={item.id}
    style={{
      ...dashboardCard,
      marginBottom: "25px",
    }}
  >

    <h2>{item.name}</h2>

    <p>{item.phone}</p>

    <p>{item.email}</p>

    <p
      style={{
        color: "#facc15",
        marginTop: "10px",
      }}
    >
      ₹99 Payment Submitted
    </p>

  </div>

))}
       {/* PENDING USERS */}

<h1
  style={{
    marginTop: "40px",
    marginBottom: "25px",
  }}
>
  Pending Users
</h1>

{pendingUsers.map((user) => (

  <div
    key={user.id}
    style={{
      ...dashboardCard,
      marginBottom: "25px",
    }}
  >

    <h2>{user.name}</h2>

    <p>{user.email}</p>

    <div
      style={{
        display: "flex",
        gap: "15px",
        marginTop: "20px",
      }}
    >

      <button
        style={{
          padding: "12px 20px",
          borderRadius: "10px",
          border: "none",
          background: "#22c55e",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={async () => {

          await updateDoc(
            doc(db, "users", user.id),
            {
              status: "approved",
            }
          );

          window.location.reload();

        }}
      >
        Approve
      </button>

      <button
        style={{
          padding: "12px 20px",
          borderRadius: "10px",
          border: "none",
          background: "#ef4444",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={async () => {

          await updateDoc(
            doc(db, "users", user.id),
            {
              status: "rejected",
            }
          );

          window.location.reload();

        }}
      >
        Disapprove
      </button>

    </div>

  </div>

))}
{/* APPROVED USERS */}

<h1
  style={{
    marginTop: "50px",
    marginBottom: "25px",
  }}
>
  Approved Users
</h1>

{approvedUsers.map((user) => (

  <div
    key={user.id}
    style={{
      ...dashboardCard,
      marginBottom: "25px",
    }}
  >

    <h2>{user.name}</h2>

    <p>{user.email}</p>

    <p
      style={{
        color: "#22c55e",
        marginTop: "10px",
      }}
    >
      Active User
    </p>

    <div
      style={{
        marginTop: "20px",
      }}
    >

      <input
        type="text"
        placeholder="Enter Project Code"
        value={
          selectedUser === user.id
            ? courseCode
            : ""
        }
        onChange={(e) => {
          setSelectedUser(user.id);
          setCourseCode(e.target.value);
        }}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "10px",
          border: "none",
          marginBottom: "15px",
        }}
      />

      <button
        style={{
          padding: "12px 20px",
          borderRadius: "10px",
          border: "none",
          background: "#3b82f6",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          width: "100%",
        }}
        onClick={async () => {

          let updateData = {};

if (courseCode === "PROJECT100") {

  updateData = {
    "projects.project1": true,
  };

}

else if (courseCode === "PROJECT200") {

  updateData = {
    "projects.project2": true,
  };

}

else if (courseCode === "PROJECT300") {

  updateData = {
    "projects.project3": true,
  };

}

else {

  alert("Invalid Project Code");

  return;

}

          await updateDoc(
            doc(db, "users", user.id),
            updateData
          );

          alert("Course Access Granted");

          window.location.reload();

        }}
      >
        Unlock Project
      </button>

      <button
        style={{
          padding: "12px 20px",
          borderRadius: "10px",
          border: "none",
          background: "#ef4444",
          color: "white",
          fontWeight: "bold",
          cursor: "pointer",
          marginTop: "20px",
          width: "100%",
        }}
        onClick={async () => {

          await updateDoc(
            doc(db, "users", user.id),
            {
              status: "pending",
            }
          );

          window.location.reload();

        }}
      >
        Make Inactive
      </button>

    </div>

  </div>

))}
      </div>
    </div>
  );
}

/* STYLES */

const courseCard = {
  background:
    "rgba(255,255,255,0.08)",
  padding: "35px",
  borderRadius: "22px",
  backdropFilter: "blur(10px)",
  border:
    "1px solid rgba(255,255,255,0.1)",
};

const dashboardCard = {
  background:
    "linear-gradient(180deg, rgba(15,23,42,0.98), rgba(15,23,42,0.9))",
  padding: "30px",
  borderRadius: "24px",
  border:
    "1px solid rgba(255,255,255,0.08)",
};

const menuStyle = {
  color: "white",
  textDecoration: "none",
  fontSize:
  window.innerWidth < 768
    ? "18px"
    : "32px",
  fontWeight: "500",
};

const loginBtn = {
  padding: "18px 45px",
  borderRadius: "18px",
  border: "2px solid #8b5cf6",
  background: "transparent",
  color: "white",
  fontSize: "30px",
  cursor: "pointer",
};

const joinBtn = {
  marginTop: "20px",
  padding: "16px 40px",
  borderRadius: "14px",
  border: "none",
  background:
    "linear-gradient(to right,#8b5cf6,#38bdf8)",
  color: "white",
  fontSize: "18px",
  cursor: "pointer",
  fontWeight: "bold",
  width: "100%",
};

const secondaryBtn = {
  marginTop: "15px",
  padding: "14px 30px",
  borderRadius: "12px",
  border:
    "1px solid #8b5cf6",
  background: "transparent",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
  width: "100%",
};

const authContainer = {
  background: "#050816",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
};

const authCard = {
  width: "460px",
  background:
    "linear-gradient(180deg, rgba(15,23,42,0.98), rgba(15,23,42,0.9))",
  padding: "50px",
  borderRadius: "28px",
  border:
    "1px solid rgba(255,255,255,0.08)",
  boxShadow:
    "0 0 40px rgba(139,92,246,0.18)",
};

const authHeading = {
  fontSize: "42px",
  textAlign: "center",
  color: "#ffffff",
  fontWeight: "700",
  marginBottom: "10px",
};

const authText = {
  textAlign: "center",
  color: "#cbd5e1",
  marginBottom: "35px",
  lineHeight: "1.8",
};

const inputStyle = {
  padding: "18px",
  marginBottom: "20px",
  borderRadius: "14px",
  border:
    "1px solid rgba(255,255,255,0.08)",
  outline: "none",
  background:
    "rgba(255,255,255,0.05)",
  color: "white",
  fontSize: "16px",
  width: "100%",
  boxSizing: "border-box",
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/training" element={<Training />} />
        <Route path="/leads" element={<Admin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/intro" element={<IntroPage />} />
        <Route path="/premium-access/:code" element={<PremiumAccessPage />} />
        <Route
  path="/sg-confirmation"
  element={<SgConfirmationPage />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;