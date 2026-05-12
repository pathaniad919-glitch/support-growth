function App() {
  return (
    <div
      style={{
        background: "#0b0f19",
        color: "white",
        minHeight: "100vh",
        padding: "60px",
        fontFamily: "Arial",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "60px" }}>
        Support & Growth
      </h1>

      <p style={{ fontSize: "24px", marginTop: "20px" }}>
        Learn AI, Blockchain & Cybersecurity
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          marginTop: "50px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#111827",
            padding: "30px",
            borderRadius: "15px",
            width: "250px",
          }}
        >
          <h2>AI</h2>
          <p>Master artificial intelligence tools and automation.</p>
        </div>

        <div
          style={{
            background: "#111827",
            padding: "30px",
            borderRadius: "15px",
            width: "250px",
          }}
        >
          <h2>Blockchain</h2>
          <p>Learn future-ready Web3 and blockchain skills.</p>
        </div>

        <div
          style={{
            background: "#111827",
            padding: "30px",
            borderRadius: "15px",
            width: "250px",
          }}
        >
          <h2>Cybersecurity</h2>
          <p>Build strong cybersecurity knowledge and protection skills.</p>
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