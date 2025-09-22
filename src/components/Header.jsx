import React from "react";
import "../styles/Header.css";
import { FaHome, FaBell, FaEnvelope, FaUser } from "react-icons/fa";
import Logo from "../assets/logo.png"; 

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src={Logo} alt="Vibe Logo" className="logo-img" />
      </div>
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
