import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { FaPaperPlane, FaSearch, FaUserCircle, FaEllipsisV, FaRegSmile } from "react-icons/fa";
import "../styles/Messages.css";

const socket = io("http://localhost:5000");

export default function Messages({ currentUser }) {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!currentUser) return;


    // Fetch all users
    fetch("http://localhost:5000/api/messages/users")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
            setUsers(data.filter(u => u._id !== currentUser._id));
        }
      })
      .catch(err => console.error("Error fetching users:", err));

    // Join my private room
    socket.emit("join_room", currentUser._id);

    const handleNewMessage = (msg) => {
        if (
            (msg.sender === currentUser._id && msg.receiver === selectedUser?._id) ||
            (msg.sender === selectedUser?._id && msg.receiver === currentUser._id)
        ) {
            setMessages((prev) => [...prev, msg]);
        }
    };

    socket.on("receive_message", handleNewMessage);

    return () => {
      socket.off("receive_message", handleNewMessage);
    };
  }, [currentUser, selectedUser]);

  useEffect(() => {
    if (selectedUser && currentUser) {
      fetch(`http://localhost:5000/api/messages/history/${currentUser._id}/${selectedUser._id}`)
        .then((res) => res.json())
        .then((data) => {
            if (Array.isArray(data)) {
                setMessages(data);
            }
        })
        .catch(err => console.error("Error fetching history:", err));
    }
  }, [selectedUser, currentUser]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !selectedUser) return;

    const msgData = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      text: input,
      createdAt: new Date().toISOString(),
    };

    socket.emit("send_message", msgData);
    setInput("");
  };

  const filteredUsers = users.filter((u) =>
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="messages-layout glass-panel">
      {/* Sidebar: User List */}
      <div className="messages-sidebar">
        <div className="sidebar-header">
          <h2>Messages</h2>
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder="Search members..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="user-list">
          {filteredUsers.map((user) => (
            <div
              key={user._id}
              className={`user-item ${selectedUser?._id === user._id ? "active" : ""}`}
              onClick={() => setSelectedUser(user)}
            >
              <div className="user-avatar">
                <FaUserCircle size={40} />
                <span className="status-dot"></span>
              </div>
              <div className="user-info">
                <span className="username">{user.username}</span>
                <span className="last-msg">Click to chat...</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-area">
        {selectedUser ? (
          <>
            <div className="chat-header">
              <div className="header-info">
                <FaUserCircle size={40} />
                <div>
                  <h3>{selectedUser.username}</h3>
                  <span className="status-text">Online</span>
                </div>
              </div>
              <FaEllipsisV className="header-icon" />
            </div>

            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message-bubble ${msg.sender === currentUser._id ? "me" : "them"}`}
                >
                  <p>{msg.text}</p>
                  <span className="time">
                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input" onSubmit={handleSend}>
              <button type="button" className="input-icon"><FaRegSmile /></button>
              <input
                type="text"
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button type="submit" className="send-btn">
                <FaPaperPlane />
              </button>
            </form>
          </>
        ) : (
          <div className="no-chat">
            <div className="welcome-msg">
              <FaUserCircle size={80} />
              <h2>Your Inbox</h2>
              <p>Select a member from the list to start a conversation.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
