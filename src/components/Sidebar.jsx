import React, { useState } from "react";
import { 
  FaUser, FaHome, FaUsers, FaCommentDots, FaBell, 
  FaCamera, FaVideo, FaGamepad, FaUsersCog, FaShoppingCart, 
  FaSave, FaCog, FaSignOutAlt, FaChevronDown, FaChevronUp, FaUserCircle
} from "react-icons/fa";
import "../styles/Sidebar.css";

export default function Sidebar() {
  const [showFriends, setShowFriends] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // ✅ Updated Friends list
  const friends = ["Aiza", "Alia", "Aliza"];

  const messages = [
    { name: "Alice", text: "Hey! How are you?" },
    { name: "Bob", text: "Let’s meet tomorrow." }
  ];

  const notifications = [
    { name: "Aryan", text: "Missed call from Aryan" },
    { name: "Aiza", text: "Aiza posted a new post" }
  ];

  // ✅ Logout handler with confirmation
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      console.log("User logged out");
      // Add your logout logic here, e.g., redirect to login page
      // window.location.href = "/login";
    } else {
      console.log("Logout canceled");
    }
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul className="menu">
          <li className="menu-section"><strong>Profile</strong></li>
          <li><FaHome className="icon" /> Home</li>

          {/* Friends Dropdown */}
          <li onClick={() => setShowFriends(!showFriends)} className="dropdown-toggle">
            <FaUsers className="icon" /> Friends
            {showFriends ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
          </li>
          {showFriends && (
            <ul className="submenu">
              {friends.map((friend, index) => (
                <li key={index}><FaUserCircle className="icon" /> {friend}</li>
              ))}
            </ul>
          )}

          {/* Messages Dropdown */}
          <li onClick={() => setShowMessages(!showMessages)} className="dropdown-toggle">
            <div className="icon-wrapper">
              <FaCommentDots className="icon" /> 
              {messages.length > 0 && <span className="badge">{messages.length}</span>}
            </div>
            Messages
            {showMessages ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
          </li>
          {showMessages && (
            <ul className="submenu">
              {messages.map((msg, index) => (
                <li key={index} className="message-item">
                  <FaUserCircle className="icon" />
                  <div className="msg-content">
                    <strong>{msg.name}</strong>
                    <span className="msg-text">{msg.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {/* Notifications Dropdown */}
          <li onClick={() => setShowNotifications(!showNotifications)} className="dropdown-toggle">
            <div className="icon-wrapper">
              <FaBell className="icon" /> 
              {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
            </div>
            Notifications
            {showNotifications ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
          </li>
          {showNotifications && (
            <ul className="submenu">
              {notifications.map((note, index) => (
                <li key={index} className="message-item">
                  <FaUserCircle className="icon" />
                  <div className="msg-content">
                    <strong>{note.name}</strong>
                    <span className="msg-text">{note.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </ul>

        <ul className="menu">
          <li className="menu-section"><strong>Explore</strong></li>
          <li><FaCamera className="icon" /> Photos</li>
          <li><FaVideo className="icon" /> Videos</li>
          <li><FaGamepad className="icon" /> Games</li>
          <li><FaUsersCog className="icon" /> Groups</li>
          <li><FaShoppingCart className="icon" /> Marketplace</li>
        </ul>

        <ul className="menu">
          <li className="menu-section"><strong>More</strong></li>
          <li><FaSave className="icon" /> Saved</li>
          <li><FaCog className="icon" /> Settings</li>
         
          <li onClick={handleLogout}><FaSignOutAlt className="icon" /> Logout</li>
        </ul>
      </nav>
    </aside>
  );
}
