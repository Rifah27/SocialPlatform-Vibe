import React, { useState } from "react";
import { FaImage, FaSmile, FaHashtag, FaPaperPlane } from "react-icons/fa";
import "../styles/App.css";

export default function CreatePost({ user, onPostCreated }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ content })
      });
      const data = await response.json();
      if (response.ok) {
        setContent("");
        if (onPostCreated) onPostCreated(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel" style={{ padding: "24px", marginBottom: "32px", borderRadius: "32px" }}>
      <div style={{ display: "flex", gap: "16px" }}>
        <img 
          src={user?.avatar || "https://i.pravatar.cc/150?u=" + user?.username} 
          alt="User" 
          style={{ width: "50px", height: "50px", borderRadius: "16px", objectFit: "cover" }} 
        />
        <form onSubmit={handleSubmit} style={{ flex: 1 }}>
          <textarea
            placeholder={`What's on your mind, ${user?.username || 'Guest'}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              minHeight: "100px",
              background: "rgba(0,0,0,0.02)",
              border: "none",
              borderRadius: "20px",
              padding: "20px",
              fontSize: "1.1rem",
              outline: "none",
              resize: "none",
              color: "#1e293b",
              fontFamily: "inherit"
            }}
          />
          
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center", 
            marginTop: "20px",
            paddingTop: "15px",
            borderTop: "1px solid rgba(0,0,0,0.05)"
          }}>
            <div style={{ display: "flex", gap: "15px" }}>
              <button type="button" className="action-btn-light">
                <FaImage style={{ color: "#3b82f6" }} /> <span>Media</span>
              </button>
              <button type="button" className="action-btn-light">
                <FaSmile style={{ color: "#f59e0b" }} /> <span>Feeling</span>
              </button>
              <button type="button" className="action-btn-light">
                <FaHashtag style={{ color: "#9d50bb" }} /> <span>Tags</span>
              </button>
            </div>
            
            <button 
              type="submit" 
              disabled={loading || !content.trim()}
              style={{
                background: "var(--gradient-primary)",
                color: "white",
                border: "none",
                padding: "12px 28px",
                borderRadius: "14px",
                fontWeight: "800",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                cursor: "pointer",
                opacity: loading || !content.trim() ? 0.6 : 1,
                transition: "all 0.3s ease",
                boxShadow: "0 10px 20px rgba(157, 80, 187, 0.2)"
              }}
            >
              {loading ? "Posting..." : <><FaPaperPlane /> Post</>}
            </button>
          </div>
        </form>
      </div>
      
      <style>{`
        .action-btn-light {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0,0,0,0.03);
          border: none;
          padding: 8px 16px;
          borderRadius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .action-btn-light:hover {
          background: rgba(0,0,0,0.06);
          color: #1e293b;
        }
      `}</style>
    </div>
  );
}
