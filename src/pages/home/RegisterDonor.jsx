// src/pages/home/RegisterDonor.jsx
import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../styles/theme.css";

export default function RegisterDonor() {
  const [donor, setDonor] = useState({
    name: "",
    age: "",
    blood: "",
    phone: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDonor({ ...donor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!donor.name || !donor.age || !donor.blood || !donor.phone || !donor.city) {
      alert("⚠️ Please fill out all fields!");
      return;
    }

    setLoading(true);
    try {
      // Demo Mode: Save to localStorage so it appears in the UI
      const existingDonors = JSON.parse(localStorage.getItem('mockDonors') || '[]');
      const newDonor = {
        id: 'local_' + Date.now(),
        ...donor,
        lat: 17.385 + (Math.random() - 0.5) * 0.1, // Random coords around Hyderabad for the map
        lng: 78.486 + (Math.random() - 0.5) * 0.1,
        type: 'donor'
      };
      localStorage.setItem('mockDonors', JSON.stringify([...existingDonors, newDonor]));

      alert("✅ Donor Registered Successfully!");
      navigate("/home");
    } catch (error) {
      console.warn("Error saving mock data:", error.message);
      alert("Failed to register. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="form-page">
      <h1>Register as a Donor</h1>
      <p className="subtitle">Join our mission to save lives — fill in your details below.</p>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group-vertical">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="e.g. John Doe"
              value={donor.name}
              onChange={handleChange}
            />
          </div>
          <div className="input-row">
            <div className="input-group-vertical">
              <label>Age</label>
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={donor.age}
                onChange={handleChange}
              />
            </div>
            <div className="input-group-vertical">
              <label>Blood Group</label>
              <select
                name="blood"
                value={donor.blood}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
          </div>
          <div className="input-group-vertical">
            <label>City / Area</label>
            <input
              type="text"
              name="city"
              placeholder="Your Location"
              value={donor.city}
              onChange={handleChange}
            />
          </div>
          <div className="input-group-vertical">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="+1234567890"
              value={donor.phone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="primary" disabled={loading}>
            {loading ? "Registering..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
}
