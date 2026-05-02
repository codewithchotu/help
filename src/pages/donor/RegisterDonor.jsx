import React from "react";
import "./RegisterDonor.css";
import "../../styles/theme.css";


export default function RegisterDonor() {
  return (
    <div className="register-donor-page">
      <h1>Become a Donor</h1>
      <p>Fill in your details to register as a blood donor.</p>

      <form className="register-form">
        <input type="text" placeholder="Full Name" required />
        <input type="email" placeholder="Email Address" required />
        <input type="text" placeholder="Blood Group (e.g., B+)" required />
        <input type="text" placeholder="City" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
