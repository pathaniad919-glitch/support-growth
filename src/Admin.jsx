import { useEffect, useState, useRef } from "react";
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
  const todayLeads = leads.filter((lead) => {
  if (!lead.createdAt) return false;

  const leadDate = lead.createdAt.toDate();
  const today = new Date();

  return (
    leadDate.getDate() === today.getDate() &&
    leadDate.getMonth() === today.getMonth() &&
    leadDate.getFullYear() === today.getFullYear()
  );
});
  const audioRef = useRef(new Audio("/notification.mp3"));
const firstLoad = useRef(true);
  const updateStatus = async (id, status) => {
  await updateDoc(doc(db, "leads", id), {
    status,
  });
};

const deleteLead = async (id) => {
  await deleteDoc(doc(db, "leads", id));
};

  useEffect(() => {

  const unsubscribe = onSnapshot(collection(db, "leads"), (snapshot) => {
    const leadList = snapshot.docs
  .map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
  .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

    if (!firstLoad.current && snapshot.docChanges().length > 0) {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          audioRef.current.currentTime = 0;
audioRef.current.play().catch((err) => console.log(err));
        }
      });
    }

    firstLoad.current = false;
    setLeads(leadList);
  });

  return () => unsubscribe();
}, []);

  return (
  <div
    style={{
      padding: "20px",
      backgroundColor: "white",
      minHeight: "100vh",
      color: "black",
    }}
  >
    <h1>All Leads</h1>
    <p>Today's Leads: {todayLeads.length}</p>
    <button
  onClick={() => {
    audioRef.current.play().then(() => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    });
  }}
>
  Enable Sound 🔔
</button>

    {leads.length === 0 ? (
      <p>No leads found</p>
    ) : (
      leads.map((lead) => (
        <div
          key={lead.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
            background: "#f5f5f5",
            color: "black",
          }}
        >
          <p><strong>Name:</strong> {lead.name}</p>
<p>
  <strong>Phone:</strong>{" "}
  <a href={`tel:${lead.phone}`}>{lead.phone}</a>
</p>
<p>
  <strong>Status:</strong>{" "}
  <span
    style={{
      color:
        lead.status === "picked"
          ? "green"
          : lead.status === "redial"
          ? "orange"
          : "red",
      fontWeight: "bold",
    }}
  >
    {lead.status || "new"}
  </span>
</p>

<button
  style={{ marginRight: "10px" }}
  onClick={() => updateStatus(lead.id, "picked")}
>
  Picked
</button>

<button
  style={{ marginRight: "10px" }}
  onClick={() => updateStatus(lead.id, "redial")}
>
  Redial
</button>

<button onClick={() => deleteLead(lead.id)}>
  Delete
</button>
        </div>
      ))
    )}
  </div>
);
}