import React from "react";
import "../styles/Pages.css";
import PostCard from "./PostCard";
import { FaEdit, FaMapMarkerAlt, FaLink, FaCalendarAlt, FaUserCircle } from "react-icons/fa";

export default function Profile({ user }) {
  // Demo data for posts (in a real app, these would also come from backend)
  const userPosts = [
    {
      id: "up1",
      author: { 
        name: user?.username || "Guest", 
        avatar: user?.avatar || "https://i.pravatar.cc/150?u=" + user?.username 
      },
      content: user?.bio || "Exploring the new Vibera features! This platform is so smooth. 🚀 #Vibera #ModernUI",
      media: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"],
      likes: 128,
      shares: 12,
      tags: ["#Design", "#Future"],
      createdAt: new Date().toISOString()
    }
  ];

  return (
    <div className="page-container profile-page">
      <div className="profile-hero glass-panel">
        <img 
          src={user?.coverPhoto || "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=1200"} 
          alt="Cover" 
          className="profile-cover" 
        />
        <div className="profile-avatar-wrap">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="profile-avatar-img" 
            />
          ) : (
            <div className="profile-avatar-img" style={{ 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "center", 
              background: "var(--gradient-primary)",
              color: "white",
              fontSize: "4rem"
            }}>
              {user?.username?.[0]?.toUpperCase() || <FaUserCircle />}
            </div>
          )}
        </div>
      </div>

      <div className="profile-info-section">
        <div className="profile-stats-bar">
          <div className="stat-item">
            <span className="stat-value">{user?.followers?.length || 0}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{user?.following?.length || 0}</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">1</span>
            <span className="stat-label">Posts</span>
          </div>
          <button className="edit-profile-btn" style={{
            background: "var(--gradient-primary)",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "16px",
            fontWeight: "700",
            marginLeft: "20px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
            <FaEdit /> Edit Profile
          </button>
        </div>

        <div className="profile-details-box" style={{ marginTop: "32px", padding: "0 20px" }}>
          <h1 style={{ fontSize: "2.5rem", marginBottom: "8px" }}>{user?.username || "Vibera User"}</h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", maxWidth: "600px", margin: "0 0 20px 0" }}>
            {user?.bio || "No bio yet. Add one in settings! ✨"}
          </p>
          
          <div style={{ display: "flex", gap: "24px", color: "#94a3b8", fontSize: "0.9rem" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><FaMapMarkerAlt /> Earth</span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><FaLink /> vibera.io/{user?.username}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "6px" }}><FaCalendarAlt /> Joined Vibera</span>
          </div>
        </div>
      </div>

      <div className="profile-tabs" style={{ 
        display: "flex", 
        gap: "40px", 
        borderBottom: "1px solid #e2e8f0", 
        padding: "0 20px",
        marginTop: "40px"
      }}>
        <span style={{ 
          padding: "16px 0", 
          fontWeight: "800", 
          color: "#9d50bb", 
          borderBottom: "3px solid #9d50bb",
          cursor: "pointer"
        }}>Posts</span>
        <span style={{ padding: "16px 0", fontWeight: "700", color: "#64748b", cursor: "pointer" }}>Media</span>
        <span style={{ padding: "16px 0", fontWeight: "700", color: "#64748b", cursor: "pointer" }}>Likes</span>
      </div>

      <div className="posts-masonry-grid" style={{ marginTop: "32px" }}>
        {userPosts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
