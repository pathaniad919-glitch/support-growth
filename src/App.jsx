import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";

/* HOME */

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
          padding: "25px 60px",
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
              width: "70px",
              height: "70px",
              objectFit: "contain",
            }}
          />

          <div>
            <h2
              style={{
                margin: 0,
                fontSize: "24px",
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
            gap: "20px",
            alignItems: "center",
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
            marginBottom: "40px",
          }}
        >
          Premium Skill Programs
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(300px,1fr))",
            gap: "30px",
          }}
        >
          {[
            {
              icon: "🤖",
              title: "AI Mastery",
            },

            {
              icon: "🛒",
              title:
                "Dropshipping Empire",
            },

            {
              icon: "🚀",
              title: "Brand Building",
            },

            {
              icon: "💻",
              title:
                "Digital Products",
            },

            {
              icon: "📈",
              title:
                "Marketing Psychology",
            },

            {
              icon: "🌍",
              title: "Freelancing",
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
                Premium mentorship and
                advanced business systems.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
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
            marginBottom: "40px",
          }}
        >
          Membership Plans
        </h2>

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
              plan: "Starter",
              price: "₹999",
            },

            {
              plan: "Growth",
              price: "₹1999",
            },

            {
              plan: "Elite",
              price: "₹7999",
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
                width: "400px",
                background: "#0f172a",
                padding: "40px",
                borderRadius: "24px",
              }}
            >
              <h1>
                {selectedPlan.plan} Plan
              </h1>

              <p
                style={{
                  color: "#d1d5db",
                  marginTop: "20px",
                }}
              >
                Payment gateway will be
                added later.
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
            marginBottom: "40px",
          }}
        >
          Student Success Stories
        </h2>

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
              <h3
                style={{
                  fontSize: "28px",
                  marginBottom: "15px",
                }}
              >
                {review.name}
              </h3>

              <p
                style={{
                  color: "#d1d5db",
                  lineHeight: "1.9",
                  fontSize: "18px",
                }}
              >
                “{review.result}”
              </p>

              <div
                style={{
                  marginTop: "20px",
                  color: "#facc15",
                  fontSize: "22px",
                }}
              >
                ⭐⭐⭐⭐⭐
              </div>
            </div>
          ))}
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

  const adminEmail =
    "admin@gmail.com";

  const adminPassword =
    "123456";

  const handleLogin = () => {
    const savedUser = JSON.parse(
      localStorage.getItem("user")
    );

    // ADMIN LOGIN
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

    // USER NOT FOUND
    if (!savedUser) {
      alert(
        "Please create account first."
      );

      navigate("/signup");

      return;
    }

    // USER LOGIN
    if (
      email.trim() ===
        savedUser.email &&
      password.trim() ===
        savedUser.password
    ) {
      if (
        savedUser.approvalStatus !==
        "Approved"
      ) {
        alert(
          "Waiting for admin approval."
        );

        return;
      }

      localStorage.setItem(
        "loggedIn",
        "true"
      );

      alert("Login Successful");

      navigate("/dashboard");
    } else {
      alert(
        "Invalid Email or Password"
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
          Login to access dashboard.
        </p>

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
          placeholder="Password"
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
          Login
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

  const [documentPreview,
    setDocumentPreview] =
    useState("");

  const handleSignup = () => {
    if (
      !name ||
      !email ||
      !password
    ) {
      alert("Fill all fields");

      return;
    }

    const userData = {
      name,
      email,
      password,
      approvalStatus: "Pending",
      document: documentPreview,
      dailyLearning: "2 Hours",
      dailyEarning: "₹0",
    };

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    alert(
      "Account created. Wait for admin approval."
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
          Upload your PAN/Aadhaar for
          approval.
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
          placeholder="Password"
          style={inputStyle}
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <input
          type="file"
          style={{
            marginBottom: "20px",
            color: "white",
          }}
          onChange={(e) => {
            const file =
              e.target.files[0];

            if (file) {
              const reader =
                new FileReader();

              reader.onloadend =
                () => {
                  setDocumentPreview(
                    reader.result
                  );
                };

              reader.readAsDataURL(
                file
              );
            }
          }}
        />

        {documentPreview && (
          <img
            src={documentPreview}
            alt="document"
            style={{
              width: "100%",
              borderRadius: "14px",
              marginBottom: "20px",
            }}
          />
        )}

        <button
          style={joinBtn}
          onClick={handleSignup}
        >
          Create Account
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

  if (
    isLoggedIn !== "true" ||
    !user
  ) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    localStorage.removeItem(
      "loggedIn"
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
        }}
      >
        <div>
          <h1>
            Welcome {user?.name} 🚀
          </h1>

          <p>
            Status:
            {" "}
            {user?.approvalStatus}
          </p>
        </div>

        <button
          style={loginBtn}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          marginTop: "40px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(300px,1fr))",
          gap: "25px",
        }}
      >
        <div style={dashboardCard}>
          <h2>📚 Learning</h2>

          <p
            style={{
              fontSize: "30px",
            }}
          >
            {user?.dailyLearning}
          </p>
        </div>

        <div style={dashboardCard}>
          <h2>💰 Earnings</h2>

          <p
            style={{
              fontSize: "30px",
            }}
          >
            {user?.dailyEarning}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ADMIN PANEL */

function AdminPanel() {
  const navigate = useNavigate();

  const adminLoggedIn =
    localStorage.getItem(
      "adminLoggedIn"
    );

  if (adminLoggedIn !== "true") {
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const approveUser = () => {
    const updatedUser = {
      ...user,
      approvalStatus: "Approved",
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    alert("User Approved");

    window.location.reload();
  };

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
        }}
      >
        <h1>Admin Panel 👑</h1>

        <button
          style={loginBtn}
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <div
        style={{
          marginTop: "40px",
        }}
      >
        <div style={dashboardCard}>
          <h2>Registered User</h2>

          <p>
            Name: {user?.name}
          </p>

          <p>
            Email: {user?.email}
          </p>

          <p>
            Status:
            {" "}
            {user?.approvalStatus}
          </p>

          {user?.document && (
            <img
              src={user.document}
              alt="document"
              style={{
                width: "300px",
                borderRadius: "14px",
                marginTop: "20px",
              }}
            />
          )}

          {user?.approvalStatus !==
            "Approved" && (
            <button
              style={joinBtn}
              onClick={approveUser}
            >
              Approve User
            </button>
          )}
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

/* APP */

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