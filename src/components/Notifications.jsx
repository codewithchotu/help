import React, { useState, useEffect } from "react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Urgent: A+ required in Delhi", desc: "Please contact Meera Patel — 7777xxxx", time: "2m ago" },
    { id: 2, title: "Donation drive at City Hospital", desc: "Tomorrow 10:00 - 16:00", time: "1d ago" },
  ]);

  useEffect(() => {
    // Listen for new notification events (from RequestBlood.jsx or Firebase)
    const handleNewNotification = (e) => {
      const newNote = {
        id: Date.now(),
        title: "New Blood Request 🚨",
        desc: e.detail || "Someone has requested blood donation.",
        time: "Just now",
      };
      setNotifications((prev) => [newNote, ...prev]);
    };

    window.addEventListener("newRequest", handleNewNotification);
    return () => window.removeEventListener("newRequest", handleNewNotification);
  }, []);

  return (
    <div
      className="card"
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: 20,
        boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        maxWidth: 450,
        margin: "40px auto",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Notifications</h2>
      <div className="notify-list" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {notifications.map((n) => (
          <div
            key={n.id}
            style={{
              padding: 10,
              borderRadius: 10,
              background: "linear-gradient(180deg, #fff, #fafafa)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontWeight: 600 }}>{n.title}</div>
              <div style={{ color: "#666", fontSize: 13 }}>{n.desc}</div>
            </div>
            <div style={{ textAlign: "right", color: "#999", fontSize: 12 }}>{n.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

