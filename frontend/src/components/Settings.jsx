import React, { useState, useEffect } from "react";
import "../styles/Pages.css";
import { 
  FaUser, FaLock, FaBell, FaPalette, FaShieldAlt, 
  FaCheckCircle, FaTrashAlt, FaMoon, FaSun, FaGlobe 
} from "react-icons/fa";

export default function Settings({ user }) {
  const [activeTab, setActiveTab] = useState("profile");
  const [toast, setToast] = useState(null);
  
  // Settings States
  const [profileData, setProfileData] = useState({
    username: user?.username || "Guest",
    email: user?.email || "guest@vibera.io",
    bio: "Digital Creator & Design Enthusiast. Building the future of social media one vibe at a time. ✨"
  });

  const [notifications, setNotifications] = useState({
    emailNotif: true,
    pushNotif: true,
    mentions: true,
    marketing: false
  });

  const [theme, setTheme] = useState("light");
  const [accentColor, setAccentColor] = useState("#9d50bb");
  const [privacy, setPrivacy] = useState("public");

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    showToast("Profile updated successfully!");
  };

  const handleSecuritySave = (e) => {
    e.preventDefault();
    showToast("Password changed successfully!");
  };

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
        {/* Sidebar Menu */}
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
          <div style={{ marginTop: "auto", paddingTop: "20px" }}>
             <button className="settings-menu-item" style={{ 
               width: "100%", 
               textAlign: "left", 
               color: "#ef4444", 
               display: "flex", 
               alignItems: "center", 
               gap: "12px",
               border: "none",
               background: "none"
             }}>
               <FaTrashAlt /> Delete Account
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="settings-content">
          
          {/* PROFILE SECTION */}
          {activeTab === "profile" && (
            <form className="settings-section" onSubmit={handleProfileSave}>
              <h2 className="settings-section-title">Public Profile</h2>
              <div style={{ display: "flex", alignItems: "center", gap: "24px", marginBottom: "32px" }}>
                 <img src={"https://i.pravatar.cc/150?u=" + profileData.username} alt="Profile" style={{ width: "80px", height: "80px", borderRadius: "24px", objectFit: "cover" }} />
                 <div>
                    <button type="button" style={{ background: "var(--gradient-primary)", color: "white", border: "none", padding: "10px 20px", borderRadius: "12px", fontWeight: "700", cursor: "pointer", marginBottom: "8px" }}>Change Photo</button>
                    <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>JPG, GIF or PNG. Max size 2MB.</p>
                 </div>
              </div>
              <div className="settings-form-group">
                <label>Username</label>
                <input type="text" value={profileData.username} onChange={(e) => setProfileData({...profileData, username: e.target.value})} />
              </div>
              <div className="settings-form-group">
                <label>Email Address</label>
                <input type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} />
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
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" style={{ background: "var(--gradient-primary)", color: "white", border: "none", padding: "16px 32px", borderRadius: "16px", fontWeight: "800", cursor: "pointer" }}>Save Changes</button>
            </form>
          )}

          {/* SECURITY SECTION */}
          {activeTab === "security" && (
            <form className="settings-section" onSubmit={handleSecuritySave}>
              <h2 className="settings-section-title">Security Settings</h2>
              <div className="settings-form-group">
                <label>Current Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="settings-form-group">
                <label>New Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="settings-form-group">
                <label>Confirm New Password</label>
                <input type="password" placeholder="••••••••" />
              </div>
              <div className="settings-toggle">
                 <div>
                   <p style={{ margin: 0, fontWeight: "700" }}>Two-Factor Authentication</p>
                   <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>Add an extra layer of security to your account.</p>
                 </div>
                 <label className="switch">
                   <input type="checkbox" />
                   <span className="slider"></span>
                 </label>
              </div>
              <button type="submit" style={{ background: "var(--gradient-primary)", color: "white", border: "none", padding: "16px 32px", borderRadius: "16px", fontWeight: "800", cursor: "pointer", marginTop: "24px" }}>Update Password</button>
            </form>
          )}

          {/* NOTIFICATIONS SECTION */}
          {activeTab === "notifications" && (
            <div className="settings-section">
              <h2 className="settings-section-title">Notification Preferences</h2>
              <div className="settings-toggle">
                 <div>
                   <p style={{ margin: 0, fontWeight: "700" }}>Email Notifications</p>
                   <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>Receive updates about your activity via email.</p>
                 </div>
                 <label className="switch">
                   <input type="checkbox" checked={notifications.emailNotif} onChange={() => setNotifications({...notifications, emailNotif: !notifications.emailNotif})} />
                   <span className="slider"></span>
                 </label>
              </div>
              <div className="settings-toggle">
                 <div>
                   <p style={{ margin: 0, fontWeight: "700" }}>Push Notifications</p>
                   <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>Receive real-time alerts on your device.</p>
                 </div>
                 <label className="switch">
                   <input type="checkbox" checked={notifications.pushNotif} onChange={() => setNotifications({...notifications, pushNotif: !notifications.pushNotif})} />
                   <span className="slider"></span>
                 </label>
              </div>
              <div className="settings-toggle">
                 <div>
                   <p style={{ margin: 0, fontWeight: "700" }}>Mentions & Tags</p>
                   <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>Notify when someone mentions or tags you.</p>
                 </div>
                 <label className="switch">
                   <input type="checkbox" checked={notifications.mentions} onChange={() => setNotifications({...notifications, mentions: !notifications.mentions})} />
                   <span className="slider"></span>
                 </label>
              </div>
            </div>
          )}

          {/* DISPLAY SECTION */}
          {activeTab === "display" && (
            <div className="settings-section">
              <h2 className="settings-section-title">Display & Appearance</h2>
              
              <div className="settings-form-group">
                <label>Interface Theme</label>
                <div style={{ display: "flex", gap: "16px", marginTop: "12px" }}>
                   <div 
                    onClick={() => setTheme("light")}
                    style={{ 
                      flex: 1, 
                      padding: "20px", 
                      borderRadius: "16px", 
                      border: `2px solid ${theme === "light" ? "#9d50bb" : "#e2e8f0"}`,
                      background: theme === "light" ? "rgba(157, 80, 187, 0.05)" : "#fff",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px"
                    }}
                   >
                     <FaSun style={{ fontSize: "1.5rem", color: theme === "light" ? "#9d50bb" : "#64748b" }} />
                     <span style={{ fontWeight: "700" }}>Light Mode</span>
                   </div>
                   <div 
                    onClick={() => setTheme("dark")}
                    style={{ 
                      flex: 1, 
                      padding: "20px", 
                      borderRadius: "16px", 
                      border: `2px solid ${theme === "dark" ? "#9d50bb" : "#e2e8f0"}`,
                      background: theme === "dark" ? "rgba(157, 80, 187, 0.05)" : "#fff",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "8px"
                    }}
                   >
                     <FaMoon style={{ fontSize: "1.5rem", color: theme === "dark" ? "#9d50bb" : "#64748b" }} />
                     <span style={{ fontWeight: "700" }}>Dark Mode</span>
                   </div>
                </div>
              </div>

              <div className="settings-form-group">
                <label>Accent Color</label>
                <div className="color-options">
                  {["#9d50bb", "#23d5ab", "#e73c7e", "#ee7752", "#3b82f6"].map(color => (
                    <div 
                      key={color} 
                      className={`color-circle ${accentColor === color ? 'active' : ''}`}
                      style={{ background: color }}
                      onClick={() => { setAccentColor(color); showToast("Accent color updated!"); }}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="settings-form-group">
                <label>Language</label>
                <div style={{ position: "relative" }}>
                   <FaGlobe style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
                   <select style={{
                     width: "100%",
                     padding: "14px 20px 14px 45px",
                     borderRadius: "14px",
                     border: "1px solid #e2e8f0",
                     background: "#f8fafc",
                     outline: "none",
                     appearance: "none",
                     fontWeight: "600"
                   }}>
                     <option>English (US)</option>
                     <option>Spanish</option>
                     <option>French</option>
                     <option>German</option>
                   </select>
                </div>
              </div>
            </div>
          )}

          {/* PRIVACY SECTION */}
          {activeTab === "privacy" && (
            <div className="settings-section">
              <h2 className="settings-section-title">Privacy & Safety</h2>
              <div className="settings-form-group">
                 <label>Account Privacy</label>
                 <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                    {[
                      { id: "public", title: "Public", desc: "Anyone can see your posts and follow you." },
                      { id: "private", title: "Private", desc: "Only people you approve can see your posts." },
                    ].map(opt => (
                      <div 
                        key={opt.id}
                        onClick={() => { setPrivacy(opt.id); showToast(`Account is now ${opt.id}`); }}
                        style={{
                          padding: "16px 20px",
                          borderRadius: "16px",
                          border: `2px solid ${privacy === opt.id ? "#9d50bb" : "#e2e8f0"}`,
                          background: privacy === opt.id ? "rgba(157, 80, 187, 0.05)" : "#fff",
                          cursor: "pointer"
                        }}
                      >
                        <p style={{ margin: 0, fontWeight: "800" }}>{opt.title}</p>
                        <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>{opt.desc}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="toast">
          <FaCheckCircle style={{ color: "#22c55e" }} />
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
}
