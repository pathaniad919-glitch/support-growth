import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

function Home() {
  const [selectedPlan, setSelectedPlan] =
    useState(null);

  const isLoggedIn =
    localStorage.getItem("loggedIn") ===
    "true";

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
          justifyContent:
            "space-between",
          alignItems: "center",
          padding: "20px",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <img
            src="/logo.png"
            alt="logo"
            style={{
              width: "55px",
              height: "55px",
              objectFit: "contain",
            }}
          />

          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "22px",
              }}
            >
              SUPPORT & GROWTH
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#d1d5db",
              }}
            >
              LEARN • EARN • GROW
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
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

      {/* HERO */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          textAlign: "center",
          paddingTop: "120px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "78px",
            maxWidth: "1100px",
            lineHeight: "1.1",
            fontWeight: "bold",
          }}
        >
          Build Your Future <br />
          With AI & Business Skills
        </h1>

        <p
          style={{
            marginTop: "25px",
            fontSize: "24px",
            color: "#d1d5db",
            maxWidth: "850px",
            lineHeight: "1.6",
          }}
        >
          Learn AI, Branding,
          Dropshipping, Freelancing,
          Marketing and Business Growth
          through premium mentorship.
        </p>

        {!isLoggedIn ? (
          <Link to="/signup">
            <button style={joinBtn}>
              Start Learning
            </button>
          </Link>
        ) : (
          <Link to="/dashboard">
            <button style={joinBtn}>
              Open Dashboard
            </button>
          </Link>
        )}
      </div>

      {/* COURSES */}
      <section
        id="courses"
        style={{
          padding: "120px 60px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "55px",
            marginBottom: "20px",
          }}
        >
          Premium Skill Programs
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
            {
              icon: "🤖",
              title: "AI Mastery",
              desc:
                "Learn AI tools, automation and online income systems.",
            },

            {
              icon: "🛒",
              title:
                "Dropshipping Empire",
              desc:
                "Build ecommerce stores and scaling systems.",
            },

            {
              icon: "🚀",
              title: "Brand Building",
              desc:
                "Build authority and social media influence.",
            },

            {
              icon: "💻",
              title:
                "Digital Products",
              desc:
                "Create ebooks, templates and digital assets.",
            },

            {
              icon: "📈",
              title:
                "Marketing Psychology",
              desc:
                "Understand customer psychology and sales systems.",
            },

            {
              icon: "🌍",
              title: "Freelancing",
              desc:
                "Build global freelance income streams.",
            },
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
          plan: "Starter",
          price: "₹999",
          reason:
            "Perfect for beginners starting online business skills.",
        },

        {
          plan: "Growth",
          price: "₹1999",
          reason:
            "For serious learners building personal brands and income systems.",
        },

        {
          plan: "Elite",
          price: "₹7999",
          reason:
            "Private mentorship and premium advanced business systems.",
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

/* LOGIN */

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

    const adminEmail = "admin@gmail.com";
const adminPassword = "123456";

  const handleLogin = () => {
  const savedUser = JSON.parse(
    localStorage.getItem("user")
  );

  // ADMIN LOGIN
  if (!savedUser.approved) {
  alert(
    "Waiting for admin approval"
  );
  return;
}
if (
  email.trim() === adminEmail &&
  password.trim() === adminPassword
) {
  localStorage.setItem(
    "adminLoggedIn",
    "true"
  );
alert("Admin Login Successful");

navigate("/admin");

return;
}

  if (!savedUser) {
    alert(
      "Please create an account first."
    );

    navigate("/signup");
    return;
  }

  if (
    email.trim() === savedUser.email &&
    password.trim() === savedUser.password
  ) {
    localStorage.setItem(
      "loggedIn",
      "true"
    );

    alert("Login Successful");

    navigate("/dashboard");
  } else {
    alert(
      "Invalid email or password"
    );
  }
  // VALID LOGIN
  if (
    email === savedUser.email &&
    password === savedUser.password
  ) {
    localStorage.setItem(
      "loggedIn",
      "true"
    );

    navigate("/dashboard");
  } else {
    alert(
      "Invalid email or password."
    );
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

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {

  if (
    name.trim() === "" ||
    email.trim() === "" ||
    password.trim() === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  const userData = {
    name,
    email,
    password,
    approved: false,
    dailyLearning: "2 Hours",
    dailyEarning: "₹0",
  };

  localStorage.setItem(
    "user",
    JSON.stringify(userData)
  );

  alert(
    "Signup successful. Wait for admin approval."
  );

  navigate("/login");
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
    localStorage.getItem("loggedIn");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  /* PROTECTED ROUTE */
  if (
    isLoggedIn !== "true" ||
    !user
  ) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
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
            6 Courses
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
        Your Premium Courses
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "30px",
        }}
      >
        {[
          {
            icon: "🤖",
            title: "AI Mastery",
            progress: "72%",
          },

          {
            icon: "🛒",
            title:
              "Dropshipping Empire",
            progress: "48%",
          },

          {
            icon: "🚀",
            title: "Brand Building",
            progress: "91%",
          },

          {
            icon: "💻",
            title:
              "Digital Products",
            progress: "36%",
          },
        ].map((course) => (
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
                  {course.progress}
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
                    width:
                      course.progress,
                    height: "10px",
                    borderRadius: "20px",
                    background:
                      "linear-gradient(to right,#8b5cf6,#38bdf8)",
                  }}
                />
              </div>
            </div>

            <button style={joinBtn}>
              Watch Course
            </button>
          </div>
        ))}
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

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem(
      "adminLoggedIn"
    );

    navigate("/login");
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
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "25px",
        }}
      >

        <div style={dashboardCard}>
          <h2>Total Users</h2>

          <p
            style={{
              fontSize: "40px",
              color: "#38bdf8",
            }}
          >
            1
          </p>
        </div>

        <div style={dashboardCard}>
          <h2>Registered User</h2>

          <p
            style={{
              color: "#d1d5db",
              lineHeight: "1.8",
            }}
          >
            {user?.name}
            <br />
            {user?.email}
          </p>
        </div>

        <div style={dashboardCard}>
          <h2>Admin Access</h2>

          <p
            style={{
              fontSize: "30px",
              color: "#4ade80",
            }}
          >
            Active
          </p>
        </div>

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
  fontSize: "18px",
};

const loginBtn = {
  padding: "12px 30px",
  borderRadius: "12px",
  border:
    "1px solid #8b5cf6",
  background: "transparent",
  color: "white",
  fontSize: "16px",
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
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
  path="/admin"
  element={<AdminPanel />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;