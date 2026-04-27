import React, { useState } from "react";
import {
  FaUser, FaHome, FaUsers, FaCommentDots, FaBell,
  FaCamera, FaVideo, FaGamepad, FaShoppingCart,
  FaSave, FaCog, FaSignOutAlt, FaChevronDown, FaChevronUp, FaUserCircle,
  FaSmile, FaThumbsUp, FaComment
} from "react-icons/fa";
import "../styles/Sidebar.css";
import Logo from "../assets/vibera_v_logo.png";

export default function Sidebar({ onLogout, setView, activeView, user }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <aside className="sidebar">
      {/* Brand Logo - Floating Island Style */}
      <div className="sidebar-brand">
        <img src={Logo} alt="Vibera" className="sidebar-logo" />
      </div>

      <nav className="sidebar-nav">
        {/* Main Menu */}
        <div className="nav-group">
          <span className="group-title">Main</span>
          <ul className="menu">
            <li 
              className={activeView === "feed" ? "active" : ""} 
              onClick={() => setView("feed")}
            >
              <div className="icon-box"><FaHome className="icon" /></div>
              <span>Home</span>
              {activeView === "feed" && <div className="active-dot"></div>}
            </li>
            <li 
              onClick={() => setView("messages")} 
              className={activeView === "messages" ? "active" : ""}
            >
              <div className="icon-box">
                <FaCommentDots className="icon" />
              </div>
              <span>Messages</span>
              {activeView === "messages" && <div className="active-dot"></div>}
            </li>
            <li 
              onClick={() => setView("notifications")} 
              className={activeView === "notifications" ? "active" : ""}
            >
              <div className="icon-box">
                <FaBell className="icon" />
                <span className="badge">2</span>
              </div>
              <span>Notifications</span>
              {activeView === "notifications" && <div className="active-dot"></div>}
            </li>
          </ul>
        </div>

        {/* Discovery Group */}
        <div className="nav-group">
          <span className="group-title">Discovery</span>
          <ul className="menu">
            <li onClick={() => setView("photos")} className={activeView === "photos" ? "active" : ""}>
               <div className="icon-box"><FaCamera className="icon" /></div> 
               <span>Photos</span>
               {activeView === "photos" && <div className="active-dot"></div>}
            </li>
            <li onClick={() => setView("videos")} className={activeView === "videos" ? "active" : ""}>
               <div className="icon-box"><FaVideo className="icon" /></div> 
               <span>Videos</span>
               {activeView === "videos" && <div className="active-dot"></div>}
            </li>
            <li onClick={() => setView("games")} className={activeView === "games" ? "active" : ""}>
               <div className="icon-box"><FaGamepad className="icon" /></div> 
               <span>Games</span>
               {activeView === "games" && <div className="active-dot"></div>}
            </li>
            <li onClick={() => setView("marketplace")} className={activeView === "marketplace" ? "active" : ""}>
               <div className="icon-box"><FaShoppingCart className="icon" /></div> 
               <span>Marketplace</span>
               {activeView === "marketplace" && <div className="active-dot"></div>}
            </li>
          </ul>
        </div>

        {/* Account Group */}
        <div className="nav-group">
          <span className="group-title">Personal</span>
          <ul className="menu">
            <li onClick={() => setView("profile")} className={activeView === "profile" ? "active" : ""}>
              <div className="icon-box"><FaUser className="icon" /></div> 
              <span>Profile</span>
              {activeView === "profile" && <div className="active-dot"></div>}
            </li>
            <li onClick={() => setView("saved")} className={activeView === "saved" ? "active" : ""}>
              <div className="icon-box"><FaSave className="icon" /></div> 
              <span>Saved</span>
              {activeView === "saved" && <div className="active-dot"></div>}
            </li>
            <li onClick={() => setView("settings")} className={activeView === "settings" ? "active" : ""}>
              <div className="icon-box"><FaCog className="icon" /></div> 
              <span>Settings</span>
              {activeView === "settings" && <div className="active-dot"></div>}
            </li>
          </ul>
        </div>
      </nav>


      {/* Mini-Profile Card - The "Unique" Bottom Section */}
      <div className={`sidebar-profile-card ${activeView === "profile" ? 'active' : ''}`} onClick={() => setView("profile")} style={{ cursor: "pointer" }}>
        <div className="profile-info">
          <div className="profile-avatar">
            {user?.username?.[0] || <FaUserCircle />}
          </div>
          <div className="profile-details">
            <span className="profile-name">{user?.username || "Guest"}</span>
            <span className="profile-status">Premium</span>
          </div>
        </div>
        <button className="logout-mini-btn" onClick={(e) => { e.stopPropagation(); handleLogout(); }} title="Logout">
          <FaSignOutAlt />
        </button>
      </div>
    </aside>
  );
}


