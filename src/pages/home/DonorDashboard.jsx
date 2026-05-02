import React, { useEffect, useState } from "react";
import "./Home.css";

export default function DonorDashboard({ onBack }) {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    // Load donor data (for now, dummy data)
    const dummyDonors = [
      { name: "Amit Sharma", blood: "A+", city: "Delhi" },
      { name: "Neha Singh", blood: "B-", city: "Mumbai" },
      { name: "Rahul Verma", blood: "O+", city: "Kolkata" },
    ];
    setDonors(dummyDonors);
  }, []);

  return (
    <div className="home-container">
      <h2 className="home-title">🩸 Donor Dashboard</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {donors.map((d, i) => (
          <li
            key={i}
            style={{
              background: "#fff",
              padding: "12px 18px",
              margin: "10px 0",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
          >
            <strong>{d.name}</strong> — {d.blood} — {d.city}
          </li>
        ))}
      </ul>

      <button className="logout-button" onClick={onBack}>
        ⬅ Back
      </button>
    </div>
  );
}
