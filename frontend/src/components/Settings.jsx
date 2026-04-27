import React, { useState } from "react";
import "../styles/Pages.css";
import { FaUser, FaLock, FaBell, FaPalette, FaShieldAlt } from "react-icons/fa";

export default function Settings({ user }) {
  const [activeTab, setActiveTab] = useState("profile");

  const menuItems = [
    { id: "profile", label: "Edit Profile", icon: <FaUser /> },
    { id: "security", label: "Security", icon: <FaLock /> },
    { id: "notifications", label: "Notifications", icon: <FaBell /> },
    { id: "display", label: "Display & Theme", icon: <FaPalette /> },
    { id: "privacy", label: "Privacy", icon: <FaShieldAlt /> },
  ];

  return (
    <div className="page-container">
      <h1 className="page-title">Settings</h1>
      
      <div className="settings-grid">
        <div className="settings-menu">
          {menuItems.map(item => (
            <div 
              key={item.id} 
              className={`settings-menu-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === "profile" && (
            <div className="settings-section">
              <h2 className="settings-section-title">Public Profile</h2>
              <div className="settings-form-group">
                <label>Username</label>
                <input type="text" defaultValue={user?.username || "Guest"} />
              </div>
              <div className="settings-form-group">
                <label>Email Address</label>
                <input type="email" defaultValue={user?.email || "guest@vibera.io"} />
              </div>
              <div className="settings-form-group">
                <label>Bio</label>
                <textarea 
                  style={{
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: "14px",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    minHeight: "120px",
                    outline: "none",
                    fontFamily: "inherit"
                  }}
                  defaultValue="Digital Creator & Design Enthusiast. Building the future of social media one vibe at a time. ✨"
                ></textarea>
              </div>
              <button style={{
                background: "var(--gradient-primary)",
                color: "white",
                border: "none",
                padding: "16px 32px",
                borderRadius: "16px",
                fontWeight: "800",
                cursor: "pointer",
                marginTop: "10px"
              }}>Save Changes</button>
            </div>
          )}
          
          {activeTab !== "profile" && (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <div style={{ fontSize: "3rem", marginBottom: "20px", opacity: 0.2 }}>{menuItems.find(i => i.id === activeTab)?.icon}</div>
              <h3>{menuItems.find(i => i.id === activeTab)?.label} Settings</h3>
              <p style={{ color: "#64748b" }}>This section is coming soon in the next update.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
