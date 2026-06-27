return (
  <div
    style={{
      padding: "40px",
      background: "black",
      color: "white",
      minHeight: "100vh"
    }}
  >
    <h1>Leads Page Working</h1>

    <p>Total Leads: {leads.length}</p>

    {leads.length > 0 &&
      leads.map((lead) => (
        <div key={lead.id}>
          <pre>{JSON.stringify(lead, null, 2)}</pre>
        </div>
      ))}
  </div>
);