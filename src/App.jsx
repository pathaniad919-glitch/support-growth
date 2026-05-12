function App() {
  return (
    <div
      style={{
        background: "#020617",
        minHeight: "100vh",
        color: "white",
        fontFamily: "Arial",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "25px 60px",
          alignItems: "center",
          borderBottom: "1px solid #1e293b",
        }}
      >
        <h1 style={{ color: "#8b5cf6" }}>Support & Growth</h1>

        <div style={{ display: "flex", gap: "25px" }}>
          <p>Home</p>
          <p>Courses</p>
          <p>Mentorship</p>
          <p>Community</p>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        style={{
          textAlign: "center",
          padding: "100px 20px",
        }}
      >
        <h1
          style={{
            fontSize: "70px",
            marginBottom: "20px",
            lineHeight: "1.1",
          }}
        >
          Build Your <span style={{ color: "#8b5cf6" }}>Future</span>
        </h1>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "22px",
            maxWidth: "700px",
            margin: "auto",
          }}
        >
          Learn AI, Finance, Business & Personal Growth with mentorship,
          courses and a powerful community.
        </p>

        <button
          style={{
            marginTop: "40px",
            padding: "18px 40px",
            background: "#8b5cf6",
            border: "none",
            borderRadius: "12px",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Get Started
        </button>
      </div>

      {/* Cards */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          paddingBottom: "100px",
        }}
      >
        {[
          {
            title: "Mentorship",
            text: "1-on-1 mentorship from experts.",
          },
          {
            title: "Courses",
            text: "Learn AI, Finance & Business.",
          },
          {
            title: "Community",
            text: "Connect with ambitious people.",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              background: "#111827",
              padding: "35px",
              width: "280px",
              borderRadius: "20px",
              border: "1px solid #1e293b",
            }}
          >
            <h2>{item.title}</h2>

            <p style={{ color: "#94a3b8", marginTop: "15px" }}>
              {item.text}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "30px",
          borderTop: "1px solid #1e293b",
          color: "#64748b",
        }}
      >
        © 2026 Support & Growth. All rights reserved.
      </footer>
    </div>
  );
}

export default App;