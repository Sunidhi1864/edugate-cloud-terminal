import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function DashboardChart({ awaiting, cleared, rejected }) {
  const data = [
    { name: "Awaiting", value: awaiting },
    { name: "Cleared", value: cleared },
    { name: "Rejected", value: rejected },
  ];

  const COLORS = ["#f59e0b", "#22c55e", "#ef4444"];

  return (
    <div
      style={{
        background: "#fff",
        marginTop: "30px",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h2>📊 Gate Pass Analytics</h2>

      <div style={{ width: "100%", height: 350 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" outerRadius={120} label>
              {data.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>

            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default DashboardChart;
