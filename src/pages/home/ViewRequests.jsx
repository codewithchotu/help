import React, { useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "./ViewRequests.css";

export default function ViewRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        throw new Error("Bypassing Firebase manually");
      } catch (err) {
        const localRequests = JSON.parse(localStorage.getItem('mockRequests') || '[]');
        
        setRequests([
          ...localRequests,
          { id: '1', name: "Suresh Raina", blood: "A-", hospital: "Apollo", city: "Hyderabad", phone: "9988776655" },
          { id: '2', name: "M.S. Dhoni", blood: "O+", hospital: "Gandhi", city: "Ranchi", phone: "8877665544" }
        ]);
      }
    };
    fetchRequests();
  }, []);

  return (
    <div className="requests-page">
      {/* 🩸 Floating oval blood cells */}
      <div className="blood-bg">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="blood-cell"></div>
        ))}
      </div>

      <h2>🩸 Active Blood Requests</h2>

      <div className="requests-list">
        {requests.length === 0 ? (
          <p className="msg">No active requests found.</p>
        ) : (
          requests.map((req) => (
            <div key={req.id} className="request-card">
              <h3>{req.name}</h3>
              <p><strong>Blood Group:</strong> {req.blood}</p>
              <p><strong>Hospital:</strong> {req.hospital}</p>
              <p><strong>City:</strong> {req.city}</p>
              <p><strong>Contact:</strong> {req.phone}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
