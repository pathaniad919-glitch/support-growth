import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Admin() {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchLeads = async () => {
      const querySnapshot = await getDocs(collection(db, "leads"));

      const leadList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setLeads(leadList);
    };

    fetchLeads();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>All Leads</h1>

      {leads.map((lead) => (
        <div
          key={lead.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <pre>{JSON.stringify(lead, null, 2)}</pre>
        </div>
      ))}
    </div>
  );
}