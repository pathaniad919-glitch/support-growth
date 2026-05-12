import "./App.css";
import logo from "./assets/logo.png";

import { useEffect, useState } from "react";

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

import {
  auth,
  provider
} from "./firebase";

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();

  }, []);

  // GOOGLE LOGIN
  const handleLogin = async () => {

    try {

      await signInWithPopup(auth, provider);

    } catch (error) {

      console.log(error);

    }

  };

  // LOGOUT
  const handleLogout = async () => {

    try {

      await signOut(auth);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="app">

      {/* VIDEO BACKGROUND */}
      <video autoPlay muted loop playsInline className="video-bg">
        <source src="/bgvideo.mp4" type="video/mp4" />
      </video>

      {/* OVERLAY */}
      <div className="overlay"></div>

      {/* NAVBAR */}
      <nav className="navbar">

        <img
          src={logo}
          alt="Support & Growth"
          className="logo"
        />

        {/* NAV LINKS */}
        <div className="nav-links">

          <a href="#">Home</a>

          <a href="#courses">
            Courses
          </a>

          <a href="#testimonials">
            Testimonials
          </a>

          <a href="#why">
            Why Us
          </a>

        </div>

        {/* LOGIN / LOGOUT */}
        <div className="nav-buttons">

          {user ? (

            <button
              className="join-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          ) : (

            <button
              className="join-btn"
              onClick={handleLogin}
            >
              Login With Google
            </button>

          )}

        </div>

      </nav>

      {/* HERO */}
      <section className="hero">

        <h1>
          Build Your Future With AI & Business Skills
        </h1>

        <p>
          Learn AI, Finance, Marketing, Cybersecurity and Personal Growth
          through practical workshops and mentorship programs.
        </p>

        <button className="start-btn">
          Start Learning
        </button>

      </section>

      {/* FEATURES */}
      <section className="features">

        <div className="feature-card">
          <h2>🤖 AI Learning</h2>

          <p>
            Learn ChatGPT, Automation, AI Tools and future technologies.
          </p>
        </div>

        <div className="feature-card">
          <h2>💰 Business Growth</h2>

          <p>
            Master sales, marketing, finance and scaling systems.
          </p>
        </div>

        <div className="feature-card">
          <h2>🛡️ Cyber Security</h2>

          <p>
            Understand ethical hacking and digital protection.
          </p>
        </div>

      </section>

      {/* STATS */}
      <section className="stats">

        <div className="stat-box">
          <h2>10K+</h2>
          <p>Students Learning</p>
        </div>

        <div className="stat-box">
          <h2>50+</h2>
          <p>Live Workshops</p>
        </div>

        <div className="stat-box">
          <h2>25+</h2>
          <p>Expert Mentors</p>
        </div>

        <div className="stat-box">
          <h2>100%</h2>
          <p>Growth Mindset</p>
        </div>

      </section>

      {/* COURSES */}
      <section className="courses" id="courses">

        <h1 className="course-title">
          Premium Learning Programs
        </h1>

        <div className="course-container">

          <div className="course-card">
            <h2>AI Mastery Program</h2>

            <p>
              Learn ChatGPT, Automation, AI tools,
              Prompt Engineering and AI business systems.
            </p>

            <button className="course-btn">
              Explore Program
            </button>
          </div>

          <div className="course-card">
            <h2>Business Growth Academy</h2>

            <p>
              Learn branding, sales psychology,
              social media growth and income systems.
            </p>

            <button className="course-btn">
              Explore Program
            </button>
          </div>

          <div className="course-card">
            <h2>Cyber Security Bootcamp</h2>

            <p>
              Learn ethical hacking, cyber protection,
              privacy systems and digital security basics.
            </p>

            <button className="course-btn">
              Explore Program
            </button>
          </div>

        </div>

      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="testimonials">

        <h1 className="testimonial-title">
          What Students Say
        </h1>

        <div className="testimonial-container">

          <div className="testimonial-card">
            <p>
              “This platform completely changed my mindset and helped
              me understand AI and business deeply.”
            </p>

            <h3>— Rahul Sharma</h3>
          </div>

          <div className="testimonial-card">
            <p>
              “The mentorship and workshops are next level.
              Very practical and powerful learning.”
            </p>

            <h3>— Priya Verma</h3>
          </div>

          <div className="testimonial-card">
            <p>
              “Support & Growth feels like the future of learning
              and earning platforms.”
            </p>

            <h3>— Aman Thakur</h3>
          </div>

        </div>

      </section>

      {/* WHY US */}
      <section className="founder" id="why">

        <div className="founder-card">

          <h1>
            Why Choose Support & Growth?
          </h1>

          <p>
            We focus on practical skills, modern technology,
            business mindset and real-world growth systems
            that help students prepare for the future digital economy.
          </p>

          <div className="why-points">

            <div>✅ Practical Learning</div>

            <div>✅ AI & Business Focus</div>

            <div>✅ Modern Growth Skills</div>

            <div>✅ Live Mentorship</div>

          </div>

        </div>

      </section>

    </div>

  );
}

export default App;