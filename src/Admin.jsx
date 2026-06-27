import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc
} from "firebase/firestore";
export default function Admin() {
  const [leads, setLeads] = useState([]);
  const [audio] = useState(new Audio("/notification.mp3"));
  const updateStatus = async (id, status) => {
  await updateDoc(doc(db, "leads", id), {
    status,
  });
};

const deleteLead = async (id) => {
  await deleteDoc(doc(db, "leads", id));
};

  useEffect(() => {
  let firstLoad = true;

  const unsubscribe = onSnapshot(collection(db, "leads"), (snapshot) => {
    const leadList = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

    if (!firstLoad && snapshot.docChanges().length > 0) {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          audio.currentTime = 0;
          audio.play().catch((err) => console.log(err));
          alert("New Lead Arrived!");
        }
      });
    }

    firstLoad = false;
    setLeads(leadList);
  });

  return () => unsubscribe();
}, []);

  return (
  <div
    style={{
      padding: "30px",
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      minHeight: "100vh",
      color: "white",
      fontFamily: "Arial, sans-serif",
    }}
  >
    <h1
      style={{
        fontSize: "32px",
        marginBottom: "25px",
        fontWeight: "bold",
      }}
    >
      Lead Dashboard 🚀
    </h1>

    {leads.length === 0 ? (
      <p>No leads found</p>
    ) : (
      leads.map((lead) => (
        <div
          key={lead.id}
          style={{
            background: "rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
            borderRadius: "18px",
            padding: "20px",
            marginBottom: "18px",
            border: "1px solid rgba(255,255,255,0.1)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
          }}
        >
          <p style={{ fontSize: "18px" }}>
            <strong>Name:</strong> {lead.name}
          </p>

          <p style={{ fontSize: "18px" }}>
            <strong>Phone:</strong>{" "}
            <a
              href={`tel:${lead.phone}`}
              style={{ color: "#38bdf8", textDecoration: "none" }}
            >
              {lead.phone}
            </a>
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              style={{
                padding: "6px 12px",
                borderRadius: "20px",
                background:
                  lead.status === "picked"
                    ? "green"
                    : lead.status === "redial"
                    ? "orange"
                    : "red",
                color: "white",
                fontWeight: "bold",
              }}
            >
              {lead.status || "new"}
            </span>
          </p>

          <div style={{ marginTop: "15px" }}>
            <button
              style={{
                background: "#22c55e",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "10px",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={() => updateStatus(lead.id, "picked")}
            >
              Picked
            </button>

            <button
              style={{
                background: "#f59e0b",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "10px",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={() => updateStatus(lead.id, "redial")}
            >
              Redial
            </button>

            <button
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
              onClick={() => deleteLead(lead.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))
    )}
  </div>
);
}