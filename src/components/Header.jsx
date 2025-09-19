import React from "react";
import "../styles/Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="logo">SocialMedia</div>
      <input className="search" placeholder="Search..." />
      <nav className="nav">
        <button>🏠</button>
        <button>🔔</button>
        <button>✉️</button>
        <button>👤</button>
      </nav>
    </header>
  );
}
