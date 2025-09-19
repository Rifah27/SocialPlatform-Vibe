import React from "react";
import "../styles/Header.css";
import { FaHome, FaBell, FaEnvelope, FaUser } from "react-icons/fa";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">SocialMedia</div>
      <input className="search" placeholder="Search..." />
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
