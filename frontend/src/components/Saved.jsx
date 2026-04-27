import React from "react";
import "../styles/Pages.css";
import PostCard from "./PostCard";
import { FaBookmark } from "react-icons/fa";

export default function Saved() {
  const savedPosts = [
    {
      id: "s1",
      author: { name: "DesignBot", avatar: "https://i.pravatar.cc/150?img=12" },
      content: "10 Tips for Better Glassmorphism in 2024. Thread 🧵",
      media: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800"],
      likes: 1540,
      shares: 432,
      tags: ["#DesignTips", "#UIUX"],
      createdAt: "2024-04-20T10:00:00Z"
    }
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ 
            width: "50px", 
            height: "50px", 
            background: "rgba(157, 80, 187, 0.1)", 
            color: "#9d50bb",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem"
          }}>
            <FaBookmark />
          </div>
          <h1 className="page-title">Saved Posts</h1>
        </div>
      </div>

      <div className="posts-masonry-grid" style={{ marginTop: "20px" }}>
        {savedPosts.length > 0 ? (
          savedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="glass-panel" style={{ 
            padding: "80px", 
            textAlign: "center",
            borderRadius: "32px",
            background: "rgba(255, 255, 255, 0.7)" 
          }}>
            <FaBookmark size={60} style={{ color: "#e2e8f0", marginBottom: "20px" }} />
            <h3>No saved posts yet</h3>
            <p style={{ color: "#64748b" }}>When you find something interesting, save it to see it here later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
