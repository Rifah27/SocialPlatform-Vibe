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
  const [activeChat, setActiveChat] = useState(null);
  const [chatInput, setChatInput] = useState("");

  const friends = ["Aiza", "Alia", "Aliza", "Ansh", "Aryan"];

  const messages = [
    { name: "Alia", text: "Hey! How are you?" },
    { name: "Ansh", text: "Let’s meet tomorrow." },
    { name: "Aiza", text: "Check my new post!" },
    { name: "Aryan", text: "Missed call from me" },
    { name: "Aliza", text: "Long time no see!" }
  ];

  const notifications = [
    { name: "Aryan", text: "Missed call from Aryan" },
    { name: "Aiza", text: "Aiza posted a new post" }
  ];

  const [chats, setChats] = useState({
    Alia: [
      { sender: "Alia", text: "Hey! How are you?" },
      { sender: "Me", text: "I’m good, how about you?" },
      { sender: "Alia", text: "Doing well, thanks 😊" },
      { sender: "Me", text: "Let’s catch up soon!" },
      { sender: "Alia", text: "Sure! 👍" }
    ],
    Ansh: [
      { sender: "Ansh", text: "Let’s meet tomorrow." },
      { sender: "Me", text: "What time?" },
      { sender: "Ansh", text: "6 PM works." },
      { sender: "Me", text: "Perfect, see you then!" }
    ],
    Aiza: [
      { sender: "Aiza", text: "Did you see my new post?" },
      { sender: "Me", text: "Yes! It’s awesome 🔥" },
      { sender: "Aiza", text: "Thanks 😍" }
    ],
    Aryan: [
      { sender: "Aryan", text: "You missed my call 😅" },
      { sender: "Me", text: "Sorry, was in a meeting." },
      { sender: "Aryan", text: "No worries, call later." }
    ],
    Aliza: [
      { sender: "Aliza", text: "Long time no see!" },
      { sender: "Me", text: "Yeah, let’s plan something." },
      { sender: "Aliza", text: "Great idea!" }
    ]
  });

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      console.log("User logged out");
    }
  };

  const handleSend = () => {
    if (chatInput.trim() === "") return;
    const updatedChats = { ...chats };
    updatedChats[activeChat].push({ sender: "Me", text: chatInput });
    setChats(updatedChats);
    setChatInput("");
  };

  return (
    <aside className="sidebar">
      <nav>
        <ul className="menu">
          <li className="menu-section"><strong>Profile</strong></li>
          <li><FaHome className="icon" /> Home</li>

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
                <li key={index} className="message-item" onClick={() => setActiveChat(msg.name)}>
                  <FaUserCircle className="icon" />
                  <div className="msg-content">
                    <strong>{msg.name}</strong>
                    <span className="msg-text">{msg.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}

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

      {activeChat && (
        <div className="chat-overlay" onClick={() => setActiveChat(null)}>
          <div className="chatbox" onClick={e => e.stopPropagation()}>
            <div className="chatbox-header">
              <FaUserCircle className="icon" /> {activeChat}
              <button className="close-btn" onClick={() => setActiveChat(null)}>×</button>
            </div>
            <div className="chatbox-body">
              {chats[activeChat].map((msg, index) => (
                <div key={index} className={`chat-msg ${msg.sender === "Me" ? "me" : "other"}`}>
                  <div className="chat-bubble">{msg.text}</div>
                </div>
              ))}
            </div>
            <div className="chatbox-footer">
              <input
                type="text"
                placeholder="Type a message..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
