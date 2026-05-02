import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./viewDonor.css";
import "../../styles/theme.css";

export default function ViewDonors() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        throw new Error("Bypassing Firebase manually");
      } catch (err) {
        const localDonors = JSON.parse(localStorage.getItem('mockDonors') || '[]');
        setDonors([
          ...localDonors,
          { id: '1', name: "Rahul Sharma", blood: "A+", city: "Hyderabad", phone: "+91 98765 43210" },
          { id: '2', name: "Priya Singh", blood: "O-", city: "Mumbai", phone: "+91 87654 32109" },
          { id: '3', name: "Amit Kumar", blood: "B+", city: "Delhi", phone: "+91 76543 21098" }
        ]);
      }
    };
    fetchDonors();
  }, []);

  return (
    <div className="donors-page">
      <h1>🩸 Registered Donors</h1>
      <p className="subtitle">Browse available blood donors in your area and reach out directly.</p>

      <div className="donor-list">
        {donors.length === 0 ? (
          <p className="msg">No donors found.</p>
        ) : (
          donors.map((donor) => (
            <div key={donor.id} className="donor-card">
              <h3>{donor.name}</h3>
              <p><strong>Blood Group:</strong> <span className="blood-badge">{donor.blood}</span></p>
              <p><strong>City:</strong> {donor.city}</p>
              <p><strong>Contact:</strong> {donor.phone}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
