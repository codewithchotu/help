import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Droplet, Home, UserPlus, Search, Map as MapIcon, LogOut, Activity } from "lucide-react";
import logo from "url:../assets/logo.svg";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/home", icon: <Home size={20} /> },
    { name: "Register", path: "/register-donor", icon: <UserPlus size={20} /> },
    { name: "Request", path: "/request-blood", icon: <Droplet size={20} /> },
    { name: "Donors", path: "/view-donor", icon: <Search size={20} /> },
    { name: "Requests List", path: "/view-requests", icon: <Activity size={20} /> },
    { name: "Map", path: "/map", icon: <MapIcon size={20} /> },
  ];

  if (location.pathname === "/") return <>{children}</>;

  return (
    <div className="app-layout">
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate("/home")}>
          <img src={logo} alt="LifeLine Logo" className="logo-icon" style={{ width: 36, height: 36, borderRadius: 10 }} />
          <span>LifeLine</span>
        </div>
        <div className="nav-links">
          {navItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span>{item.name}</span>
            </div>
          ))}
        </div>
        <div className="nav-logout" onClick={() => navigate("/")}>
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </nav>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
}
