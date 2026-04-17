import React, { useState } from "react";
import "./styles/App.css";

import Sidebar from "./components/Sidebar";
import PostCard from "./components/PostCard";
import Rightbar from "./components/Rightbar";
import Login from "./components/Login";
import Register from "./components/Register";

import { 
FaRocket, 
FaBirthdayCake, 
FaPaintBrush, 
FaFire, 
FaSun, 
FaHeart, 
FaGift, 
FaRegHandPaper, 
FaUtensils, 
FaBookOpen, 
FaWaveSquare, 
FaPalette,
FaPlus
} from "react-icons/fa";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
          setIsLoggedIn(true);
        } else {
          localStorage.removeItem("token");
        }
      })
      .catch((err) => {
        console.error("Auth me error:", err);
        localStorage.removeItem("token");
      });
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  const stories = [
    { id: 1, name: "You", img: "https://i.pravatar.cc/100?img=1", isUser: true },
    { id: 2, name: "Aiza", img: "https://i.pravatar.cc/100?img=10", isUser: false },
    { id: 3, name: "Rifah", img: "https://i.pravatar.cc/100?img=3", isUser: false },
    { id: 4, name: "Alia", img: "https://i.pravatar.cc/100?img=7", isUser: false },
    { id: 5, name: "Sameer", img: "https://i.pravatar.cc/100?img=15", isUser: false },
    { id: 6, name: "Aliza", img: "https://i.pravatar.cc/100?img=13", isUser: false },
  ];

  const demoPosts = [
    {
      id: "p1",
      author: { name: "Rifah", avatar: "https://i.pravatar.cc/40?img=3" },
      content: (
        <>Just launched my new website! Check it out <FaRocket /> #webdev #coding</>
      ),
      media: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=350&fit=crop"
      ],
      likes: 30,
      shares: 5,
      tags: ["#ReactJS", "#Portfolio", "#Design"],
      createdAt: "2025-09-19T10:00:00Z",
      comments: []
    },
    {
      id: "p2",
      author: { name: "Alia", avatar: "https://i.pravatar.cc/40?img=7" },
      content: (
        <>Just tried baking a cake <FaBirthdayCake /> and it turned out so good!!</>
      ),
      media: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=350&fit=crop"
      ],
      likes: 10,
      shares: 6,
      tags: ["#Baking", "#Foodie"],
      createdAt: "2025-09-18T16:30:00Z",
      comments: []
    }
  ];

  if (!isLoggedIn) {
    if (showRegister) {
       return <Register onRegister={handleLogin} onSwitchToLogin={() => setShowRegister(false)} />;
    }
    return <Login onLogin={handleLogin} onSwitchToRegister={() => setShowRegister(true)} />;
  }

  return (
    <div className="app">
      <div className="layout">
        <Sidebar onLogout={handleLogout} />
        
        {/* Main Feed Column */}
        <main className="feed">
          <section className="stories-container glass-panel">
            {stories.map(story => (
              <div key={story.id} className={`story-item ${story.isUser ? 'user-story' : ''}`}>
                <div className="story-ring">
                  <img src={story.img} alt={story.name} />
                  {story.isUser && <div className="add-story-btn"><FaPlus size={10} /></div>}
                </div>
                <span>{story.name}</span>
              </div>
            ))}
          </section>

          <div className="posts-container">
            {demoPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </main>
        
        <Rightbar />
      </div>
    </div>
  );
}