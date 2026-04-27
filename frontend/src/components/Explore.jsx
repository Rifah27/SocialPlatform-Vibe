import React, { useState, useEffect } from "react";
import "../styles/Pages.css";
import { FaSearch, FaFire, FaUserPlus } from "react-icons/fa";

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const trending = [
    { id: 1, title: "#ViberaLaunch", posts: "24.5k posts", category: "Trending" },
    { id: 2, title: "#ModernDesign", posts: "12.2k posts", category: "Design" },
    { id: 3, title: "NextJS 15", posts: "8.9k posts", category: "Tech" },
    { id: 4, title: "Glassmorphism", posts: "5.4k posts", category: "Art" },
  ];

  const exploreGrid = [
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=600&fit=crop",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
  ];

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch();
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const performSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/profile/search/${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="explore-header" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div className="search-bar-wrap" style={{ position: "relative" }}>
          <FaSearch style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#94a3b8"
          }} />
          <input 
            type="text" 
            placeholder="Search for people on Vibera..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "18px 20px 18px 55px",
              borderRadius: "20px",
              border: "1px solid #fff",
              background: "rgba(255, 255, 255, 0.7)",
              backdropFilter: "blur(10px)",
              fontSize: "1.1rem",
              outline: "none",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)"
            }}
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="search-results glass-panel" style={{ padding: "20px", borderRadius: "24px" }}>
             <h4 style={{ marginBottom: "15px", color: "#64748b" }}>Search Results</h4>
             <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {searchResults.map(user => (
                  <div key={user._id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", borderRadius: "16px", background: "rgba(0,0,0,0.02)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <img src={user.avatar || "https://i.pravatar.cc/150?u=" + user.username} alt={user.username} style={{ width: "40px", height: "40px", borderRadius: "10px", objectFit: "cover" }} />
                      <div>
                        <p style={{ margin: 0, fontWeight: "800" }}>{user.username}</p>
                        <p style={{ margin: 0, fontSize: "0.8rem", color: "#64748b" }}>{user.bio?.substring(0, 40)}...</p>
                      </div>
                    </div>
                    <button style={{ background: "var(--gradient-primary)", color: "white", border: "none", padding: "8px 16px", borderRadius: "10px", fontWeight: "700", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}>
                      <FaUserPlus size={12} /> Follow
                    </button>
                  </div>
                ))}
             </div>
          </div>
        )}

        <div className="trending-chips" style={{ display: "flex", gap: "12px", overflowX: "auto", paddingBottom: "10px" }}>
          {["For You", "Trending", "News", "Sports", "Entertainment", "Tech"].map((chip, i) => (
            <span key={chip} style={{
              padding: "10px 24px",
              borderRadius: "100px",
              background: i === 0 ? "var(--gradient-primary)" : "rgba(255, 255, 255, 0.7)",
              color: i === 0 ? "white" : "#64748b",
              fontWeight: "700",
              whiteSpace: "nowrap",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
            }}>
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="explore-content-grid" style={{ display: "grid", gridTemplateColumns: "1fr 350px", gap: "32px" }}>
        <div className="explore-masonry" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gridAutoRows: "10px", gap: "16px" }}>
          {exploreGrid.map((img, i) => (
            <div key={i} style={{ gridRowEnd: i % 3 === 0 ? "span 25" : "span 35", borderRadius: "24px", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}>
              <img src={img} alt="Explore" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </div>

        <div className="trending-sidebar">
          <div className="glass-panel" style={{ padding: "24px", borderRadius: "32px", background: "rgba(255, 255, 255, 0.7)" }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
              <FaFire style={{ color: "#ef4444" }} /> Trending for you
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {trending.map(item => (
                <div key={item.id} style={{ cursor: "pointer" }}>
                  <span style={{ fontSize: "0.8rem", color: "#94a3b8" }}>{item.category}</span>
                  <p style={{ margin: "4px 0", fontWeight: "800", color: "#1e293b" }}>{item.title}</p>
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>{item.posts}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
