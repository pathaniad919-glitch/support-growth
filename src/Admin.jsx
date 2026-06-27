import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Admin() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    async function fetchLeads() {
      const querySnapshot = await getDocs(collection(db, "leads"));

      const leadList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLeads(leadList);
    }

    fetchLeads();
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
          <p><strong>Name:</strong> {lead.Name}</p>
<p><strong>Phone:</strong> {lead.phone}</p>
<p><strong>Email:</strong> {lead.email}</p>
<p><strong>Course:</strong> {lead.course}</p>
        </div>
      ))
    )}
  </div>
);
}