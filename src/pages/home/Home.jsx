// src/pages/home/Home.jsx
import React from "react";
import "../../styles/theme.css";
import { useNavigate } from "react-router-dom";
import { UserPlus, Droplet, Search, Map as MapIcon } from "lucide-react";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Become a Donor",
      description: "Register yourself and save lives by donating blood to those in need.",
      icon: <UserPlus size={28} />,
      path: "/register-donor",
      color: "#e11d48"
    },
    {
      title: "Request Blood",
      description: "Need blood urgently? Post your request and connect with donors.",
      icon: <Droplet size={28} />,
      path: "/request-blood",
      color: "#f43f5e"
    },
    {
      title: "Find Donors",
      description: "Search for available blood donors in your specific area or city.",
      icon: <Search size={28} />,
      path: "/view-donor",
      color: "#fb7185"
    },
    {
      title: "Nearby Map",
      description: "Locate nearby hospitals and blood banks on an interactive map.",
      icon: <MapIcon size={28} />,
      path: "/map",
      color: "#fda4af"
    }
  ];

  return (
    <div className="home-wrapper">
      <header className="home-header">
        <h1>Welcome to LifeLine</h1>
        <p className="subtitle">Your contribution can save a life. Choose an action to get started.</p>
      </header>

      <div className="card-container">
        {actions.map((action, index) => (
          <div 
            key={index} 
            className="card" 
            onClick={() => navigate(action.path)}
          >
            <div className="card-icon">
              {action.icon}
            </div>
            <h2>{action.title}</h2>
            <p>{action.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
