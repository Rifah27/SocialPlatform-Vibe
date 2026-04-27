import React from "react";
import "../styles/Pages.css";
import { FaHeart, FaComment, FaUserPlus, FaRetweet } from "react-icons/fa";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "like",
      user: "Aiza",
      avatar: "https://i.pravatar.cc/150?img=10",
      content: "liked your post about React optimization",
      time: "2 mins ago",
      icon: <FaHeart />,
      color: "#ef4444"
    },
    {
      id: 2,
      type: "follow",
      user: "Sameer",
      avatar: "https://i.pravatar.cc/150?img=15",
      content: "started following you",
      time: "15 mins ago",
      icon: <FaUserPlus />,
      color: "#3b82f6"
    },
    {
      id: 3,
      type: "comment",
      user: "Rifah",
      avatar: "https://i.pravatar.cc/150?img=3",
      content: "replied to your comment: 'That looks amazing!'",
      time: "1 hour ago",
      icon: <FaComment />,
      color: "#10b981"
    },
    {
      id: 4,
      type: "repost",
      user: "Alia",
      avatar: "https://i.pravatar.cc/150?img=7",
      content: "reposted your story",
      time: "3 hours ago",
      icon: <FaRetweet />,
      color: "#9d50bb"
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Notifications</h1>
        <button style={{
          background: "none",
          border: "none",
          color: "#9d50bb",
          fontWeight: "700",
          cursor: "pointer"
        }}>Mark all as read</button>
      </div>

      <div className="notifications-list">
        {notifications.map(notif => (
          <div key={notif.id} className="notification-item">
            <div className="notif-aura" style={{ position: "relative" }}>
              <img 
                src={notif.avatar} 
                alt={notif.user} 
                style={{ width: "50px", height: "50px", borderRadius: "15px", objectFit: "cover" }} 
              />
              <div style={{
                position: "absolute",
                bottom: "-5px",
                right: "-5px",
                background: notif.color,
                color: "white",
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                border: "2px solid #fff"
              }}>
                {notif.icon}
              </div>
            </div>
            
            <div className="notif-content">
              <p className="notif-text">
                <span style={{ fontWeight: "800" }}>{notif.user}</span> {notif.content}
              </p>
              <span className="notif-time">{notif.time}</span>
            </div>
            
            <button style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#9d50bb",
              border: "none"
            }}></button>
          </div>
        ))}
      </div>
    </div>
  );
}
