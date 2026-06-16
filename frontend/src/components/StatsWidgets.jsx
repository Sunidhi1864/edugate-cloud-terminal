import React from "react";

function StatsWidgets({ total, awaiting, cleared, rejected }) {
  const cardStyle = (color) => ({
    backgroundColor: "#ffffff",
    padding: "22px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)",
    borderLeft: `6px solid ${color}`,
  });

  const titleStyle = {
    color: "#64748b",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "25px",
        marginBottom: "30px",
      }}
    >
      <div style={cardStyle("#2563eb")}>
        <div style={titleStyle}>Total Exit Logs</div>
        <div
          style={{
            fontSize: "36px",
            fontWeight: "800",
            color: "#1e293b",
            marginTop: "5px",
          }}
        >
          {total}
        </div>
      </div>
      <div style={cardStyle("#ea580c")}>
        <div style={titleStyle}>Awaiting Exit Clearance</div>
        <div
          style={{
            fontSize: "36px",
            fontWeight: "800",
            color: "#ea580c",
            marginTop: "5px",
          }}
        >
          {awaiting}
        </div>
      </div>
      <div style={cardStyle("#16a34a")}>
        <div style={titleStyle}>Successfully Dispatched</div>
        <div
          style={{
            fontSize: "36px",
            fontWeight: "800",
            color: "#16a34a",
            marginTop: "5px",
          }}
        >
          {cleared}
        </div>
      </div>
      <div style={cardStyle("#dc2626")}>
        <div style={titleStyle}>Rejected Passes</div>
        <div
          style={{
            fontSize: "36px",
            fontWeight: "800",
            color: "#dc2626",
            marginTop: "5px",
          }}
        >
          {rejected}
        </div>
      </div>
    </div>
  );
}

export default StatsWidgets;
