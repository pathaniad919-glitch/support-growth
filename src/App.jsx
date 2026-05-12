function App() {
  return (
    <div
      style={{
        background: "#0f172a",
        minHeight: "100vh",
        color: "white",
        padding: "60px",
        fontFamily: "Arial",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "60px", marginBottom: "20px" }}>
        Support & Growth
      </h1>

      <p style={{ fontSize: "24px", color: "#cbd5e1" }}>
        Learn. Grow. Build Your Future.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          marginTop: "60px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "20px",
            width: "250px",
          }}
        >
          <h2>Mentorship</h2>
          <p>Get guidance from experienced mentors.</p>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "20px",
            width: "250px",
          }}
        >
          <h2>Courses</h2>
          <p>Learn AI, Finance, Business and more.</p>
        </div>

        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "20px",
            width: "250px",
          }}
        >
          <h2>Community</h2>
          <p>Connect with ambitious people and grow together.</p>
        </div>
      </div>

      <button
        style={{
          marginTop: "50px",
          padding: "15px 35px",
          fontSize: "18px",
          background: "#8b5cf6",
          border: "none",
          borderRadius: "10px",
          color: "white",
          cursor: "pointer",
        }}
      >
        Join Now
      </button>
    </div>
  );
}

export default App;