import React, { useState } from "react";
import { FaSearch, FaUserFriends, FaUserPlus } from "react-icons/fa";
import "../styles/Rightbar.css";

export default function Rightbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const contacts = [
    { name: "Ankur Garg", email: "ankurgg03@gmail.com" },
    { name: "Raha Srivastava", email: "rs1209@gmail.com" },
    { name: "Ananya Verma", email: "annu1001@gmail.com" },
    { name: "Aishwarya Vaish", email: "vaish0305@gmail.com" },
    { name: "Urooj Fatima", email: "fatimau0910@gmail.com" },
    { name: "Aqsa Ahmad", email: "aahmad08@gmail.com" },
    { name: "Sana Arif", email: "sana38790@gmail.com" },
    { name: "Priya Sharma", email: "priya.sharma@example.com" },
    { name: "Vikram Singh", email: "vikram.s123@example.com" },
    { name: "Neha Patel", email: "neha.patel.dev@example.com" }
  ];

  const friendsList = [
    { name: "Sana Arif", status: "online", img: "https://i.pravatar.cc/150?img=5" },
    { name: "Arif Ali", status: "online", img: "https://i.pravatar.cc/150?img=6" },
    { name: "Prashant Tiwari", status: "away", img: "https://i.pravatar.cc/150?img=7" },
    { name: "Mohd. Hassan", status: "offline", img: "https://i.pravatar.cc/150?img=8" },
    { name: "Kavya Reddy", status: "online", img: "https://i.pravatar.cc/150?img=12" },
    { name: "Rohan Kapoor", status: "away", img: "https://i.pravatar.cc/150?img=13" },
    { name: "Deepika Menon", status: "online", img: "https://i.pravatar.cc/150?img=14" },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="rightbar-modern">
      <section className="rightbar-section glass-item-card">
        <h3 className="section-title"><FaSearch /> Search</h3>
        <div className="modern-search-bar">
          <FaSearch className="prefix-icon" />
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <ul className="members-scroll">
          {filteredContacts.map((contact, index) => (
            <li key={index} className="member-item">
              <div className="member-avatar">{contact.name.charAt(0)}</div>
              <div className="member-info">
                <span className="member-name">{contact.name}</span>
                <span className="member-id">{contact.email.split('@')[0]}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="rightbar-section glass-item-card">
        <h3 className="section-title"><FaUserFriends /> Online Friends</h3>
        <div className="friends-grid">
          {friendsList.filter(f => f.status === "online").map((friend, index) => (
            <div key={index} className="friend-bubble" title={friend.name}>
              <div className="friend-frame">
                <img src={friend.img} alt={friend.name} />
                <span className="status-glow online"></span>
              </div>
              <span className="friend-label">{friend.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rightbar-section glass-item-card suggestions-bento">
        <h3 className="section-title"><FaUserPlus /> Suggestions</h3>
        <div className="suggestions-stack">
          {[
            { name: "Shraddha Singh", img: "https://i.pravatar.cc/150?img=10" },
            { name: "Riya Shukla", img: "https://i.pravatar.cc/150?img=20" },
            { name: "Amayra Khan", img: "https://i.pravatar.cc/150?img=21" }
          ].map((user, idx) => (
            <div key={idx} className="suggestion-card">
              <div className="suggestion-row">
                <img src={user.img} alt="user" />
                <div className="suggestion-meta">
                  <span className="name">{user.name}</span>
                  <button className="follow-btn">Follow</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

