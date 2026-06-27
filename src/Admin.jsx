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
  const audio = new Audio("/notification.mp3");
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
    const leadList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (leadList.length > leads.length) {
      audio.play();
      alert("New Lead Arrived!");
    }

    setLeads(leadList);
  });

  return () => unsubscribe();
}, [leads]);

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
<p><strong>Phone:</strong> {lead.phone}</p>
<p><strong>Status:</strong> {lead.status || "new"}</p>

<button onClick={() => updateStatus(lead.id, "picked")}>
  Picked
</button>

<button onClick={() => updateStatus(lead.id, "redial")}>
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