import React from "react"; 
import "./styles/App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import PostCard from "./components/PostCard";

export default function App() {
  const demoPosts = [
    {
      id: "p1",
      author: { name: "Rifah", avatar: "https://i.pravatar.cc/40?img=3" },
      content: "Just launched my new website! Check it out 🚀 #webdev #coding",
      media: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"
      ],
      likes: 12,
      shares: 2,
      tags: ["#ReactJS", "#Portfolio", "#Design"],
      createdAt: "2025-09-19T10:00:00Z",
      comments: [
        { id: "c1", author: { name: "Alia", avatar: "https://i.pravatar.cc/40?img=7" }, content: "Congrats! Looks awesome 🎉", createdAt: "2025-09-19T11:00:00Z" },
        { id: "c2", author: { name: "Aiza", avatar: "https://i.pravatar.cc/40?img=10" }, content: "🔥🔥🔥", createdAt: "2025-09-19T12:30:00Z" }
      ]
    },
    {
      id: "p2",
      author: { name: "Alia", avatar: "https://i.pravatar.cc/40?img=7" },
      content: "Just tried baking a cake 🎂 and it turned out so good!",
      media: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=250&fit=crop",
        "https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg"
      ],
      likes: 8,
      shares: 1,
      tags: ["#Baking", "#Foodie", "#DessertTime"],
      createdAt: "2025-09-18T16:30:00Z",
      comments: [
        { id: "c3", author: { name: "Rifah", avatar: "https://i.pravatar.cc/40?img=3" }, content: "Save me a slice 🍰", createdAt: "2025-09-18T17:00:00Z" }
      ]
    },
    {
      id: "p3",
      author: { name: "Aiza", avatar: "https://i.pravatar.cc/40?img=10" },
      content: "Beautiful evening 🌅 at the beach today!",
      media: [
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=250&fit=crop"
      ],
      likes: 20,
      shares: 5,
      tags: ["#BeachLife", "#SunsetLovers", "#Nature"],
      createdAt: "2025-09-17T14:00:00Z",
      comments: []
    },
    {
      id: "p4",
      author: { name: "Aliza", avatar: "https://i.pravatar.cc/40?img=13" },
      content: "Finished my new painting 🎨. What do you all think?",
      media: [
        "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop",
        "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=400&h=250&fit=crop"
      ],
      likes: 15,
      shares: 3,
      tags: ["#Art", "#Creative", "#Painting"],
      createdAt: "2025-09-16T19:45:00Z",
      comments: [
        { id: "c4", author: { name: "Aiza", avatar: "https://i.pravatar.cc/40?img=10" }, content: "Wow, this is amazing 😍", createdAt: "2025-09-16T20:00:00Z" }
      ]
    },
  ];

  return (
    <div className="app">
      <Header />
      <div className="layout">
        <Sidebar />
        <main className="feed">
          {demoPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </main>
        <Rightbar />
      </div>
    </div>
  );
}
