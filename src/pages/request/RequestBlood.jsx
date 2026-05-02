import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "../../styles/theme.css";

export default function RequestBlood() {
  const [request, setRequest] = useState({
    patientName: "",
    bloodGroup: "",
    hospital: "",
    city: "",
    contact: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!request.patientName || !request.bloodGroup || !request.hospital || !request.city || !request.contact) {
      alert("⚠️ Please fill out all fields!");
      return;
    }

    setLoading(true);
    try {
      // Demo Mode: Save to localStorage so it appears in the UI
      const existingRequests = JSON.parse(localStorage.getItem('mockRequests') || '[]');
      const newRequest = {
        id: 'req_local_' + Date.now(),
        name: request.patientName,
        blood: request.bloodGroup,
        hospital: request.hospital,
        city: request.city,
        phone: request.contact
      };
      localStorage.setItem('mockRequests', JSON.stringify([...existingRequests, newRequest]));

      alert("✅ Blood Request Submitted Successfully!");
      navigate("/home");
    } catch (error) {
      console.warn("Error saving mock data:", error.message);
      alert("✅ (Demo) Blood Request Submitted Successfully!");
      navigate("/home");
    }
    setLoading(false);
  };

  return (
    <div className="form-page">
      <h1>Request Blood Urgently</h1>
      <p className="subtitle">Fill out this form to broadcast your need to nearby donors.</p>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="input-group-vertical">
            <label>Patient Name</label>
            <input
              type="text"
              name="patientName"
              placeholder="e.g. Jane Doe"
              value={request.patientName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-row">
            <div className="input-group-vertical">
              <label>Blood Group Needed</label>
              <select
                name="bloodGroup"
                value={request.bloodGroup}
                onChange={handleChange}
                required
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
            <div className="input-group-vertical">
              <label>City / Area</label>
              <input
                type="text"
                name="city"
                placeholder="e.g. Mumbai"
                value={request.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="input-group-vertical">
            <label>Hospital Name & Address</label>
            <input
              type="text"
              name="hospital"
              placeholder="e.g. City General Hospital, Ward 3"
              value={request.hospital}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="input-group-vertical">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contact"
              placeholder="+1234567890"
              value={request.contact}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="primary" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
