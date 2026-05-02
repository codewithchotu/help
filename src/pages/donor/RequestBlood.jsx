import React, { useState } from "react";
import "./RequestBlood.css"; // ✅ Make sure this file exists in the same folder
import "../../styles/theme.css";

export default function RequestBlood() {
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    hospital: "",
    location: "",
    contact: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Blood request submitted successfully!\n\nName: ${formData.name}\nBlood Group: ${formData.bloodGroup}`);
    setFormData({
      name: "",
      bloodGroup: "",
      hospital: "",
      location: "",
      contact: "",
      reason: "",
    });
  };

  return (
    <div className="request-container">
      <h1 className="request-title">Request Blood</h1>
      <p className="request-subtitle">Fill the form below to request blood urgently.</p>

      <form className="request-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <input
          type="text"
          name="hospital"
          placeholder="Hospital Name"
          value={formData.hospital}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="City or Area"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="contact"
          placeholder="Contact Number"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <textarea
          name="reason"
          placeholder="Reason for Blood Request"
          value={formData.reason}
          onChange={handleChange}
          rows="4"
        ></textarea>

        <button type="submit" className="submit-btn">
          Submit Request
        </button>
      </form>
    </div>
  );
}
