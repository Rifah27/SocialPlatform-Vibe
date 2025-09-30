import React, { useState } from "react";
import "../styles/Header.css";
import { FaHome, FaBell, FaEnvelope, FaUser, FaSearch } from "react-icons/fa";
import Logo from "../assets/logoo.png";

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
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Vibe Logo" className="logoo-img" />
      </div>

      <form className="search-wrapper" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          className="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-btn">
          <FaSearch />
        </button>
      </form>

      <nav className="nav">
        <button>
          <FaHome />
        </button>
        <button>
          <FaBell />
        </button>
        <button>
          <FaEnvelope />
        </button>
        <button>
          <FaUser />
        </button>
      </nav>
    </header>
  );
}
