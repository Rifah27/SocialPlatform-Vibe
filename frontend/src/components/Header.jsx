import React, { useState } from "react";
import "../styles/Header.css";
import { FaHome, FaBell, FaEnvelope, FaUser, FaSearch } from "react-icons/fa";
import Logo from "../assets/vibera_v_logo.png";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
    }
  };

  return (
    <header className="header-floating-island">
      {/* Brand Logo */}
      <div className="header-brand">
        <img src={Logo} alt="Vibera" className="brand-v-logo" />
      </div>

      {/* Modern Search Hub */}
      <form className="header-search-hub" onSubmit={handleSearch}>
        <div className="search-pill-container">
          <FaSearch className="search-prefix" />
          <input
            type="text"
            placeholder="Search everything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </form>

      {/* Navigation & Action Hub */}
      <nav className="header-nav-hub">
        <button className="nav-icon-btn active" title="Home">
          <FaHome />
          <div className="nav-indicator"></div>
        </button>
        <button className="nav-icon-btn" title="Notifications">
          <FaBell />
          <span className="nav-badge">2</span>
        </button>
        <button className="nav-icon-btn" title="Messages">
          <FaEnvelope />
        </button>
        <div className="user-profile-mini">
           <div className="mini-avatar-wrap">
             <FaUser />
           </div>
        </div>
      </nav>
    </header>
  );
}

