import React, { useState } from "react";
import { FaSearch, FaUserFriends, FaUserPlus } from "react-icons/fa";
import "../styles/Rightbar.css";

export default function Rightbar() {
  const [searchTerm, setSearchTerm] = useState("");

  const contacts = [
    { name: "Ankur Garg", email: "ankurgg03@gmail.com" },
    { name: "Raunak Asgar", email: "ra1209@gmail.com" },
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
    { name: "Mohd. Hassan", status: "online", img: "https://i.pravatar.cc/150?img=6" },
    { name: "Prashant Tiwari", status: "away", img: "https://i.pravatar.cc/150?img=7" },
    { name: "Arif Ali", status: "offline", img: "https://i.pravatar.cc/150?img=8" },
    { name: "Kavya Reddy", status: "online", img: "https://i.pravatar.cc/150?img=12" },
    { name: "Rohan Kapoor", status: "away", img: "https://i.pravatar.cc/150?img=13" },
    { name: "Deepika Menon", status: "online", img: "https://i.pravatar.cc/150?img=14" },
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="rightbar">
      <div className="rightbar-columns">
        <div className="rightbar-column left">
          <section className="contacts-search">
            <h3><FaSearch /> Search Contacts</h3>
            <div className="search-input-container">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search contacts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <ul className="contacts-list">
              {filteredContacts.map((contact, index) => (
                <li key={index} className="contact-item">
                  <div className="contact-avatar">{contact.name.charAt(0)}</div>
                  <div className="contact-info">
                    <span className="contact-name">{contact.name}</span>
                    <span className="contact-email">{contact.email}</span>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="friends">
            <h3><FaUserFriends /> Friends</h3>
            <ul>
              {friendsList.map((friend, index) => (
                <li key={index}>
                  <img src={friend.img} alt={friend.name} />
                  <span>{friend.name}</span>
                  <span className={`status ${friend.status}`}></span>
                </li>
              ))}
            </ul>
          </section>

          <section className="suggestions">
            <h3><FaUserPlus /> Suggestions</h3>
            <ul>
              <li>
                <img src="https://i.pravatar.cc/150?img=10" alt="user" />
                <span className="suggestion-name">Shraddha Singh</span>
                <button className="add-btn">+ Add</button>
              </li>
              <li>
                <img src="https://i.pravatar.cc/150?img=20" alt="user" />
                <span className="suggestion-name">Riya Shukla</span>
                <button className="add-btn">+ Add</button>
              </li>
              <li>
                <img src="https://i.pravatar.cc/150?img=21" alt="user" />
                <span className="suggestion-name">Amayra Khan</span>
                <button className="add-btn">+ Add</button>
              </li>
            </ul>
          </section>
        </div>

        <div className="rightbar-column right">
        </div>
      </div>
    </aside>
  );
}
