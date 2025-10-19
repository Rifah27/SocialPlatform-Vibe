import React, { useState } from "react";
import "./styles/App.css";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Rightbar from "./components/Rightbar";
import PostCard from "./components/PostCard";
import Login from "./components/Login";

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
FaPalette 
} from "react-icons/fa";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const demoPosts = [
 {
 id: "p1",
 author: { name: "Rifah", avatar: "https://i.pravatar.cc/40?img=3" },
 content: (
 <>
 Just launched my new website! Check it out <FaRocket /> #webdev #coding
 </>
 ),
 media: [
 "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
 "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=250&fit=crop"
  ],
  likes: 30,
 shares: 5,
 tags: ["#ReactJS", "#Portfolio", "#Design"],
 createdAt: "2025-09-19T10:00:00Z", comments: [
 { 
  id: "c1", 
 author: { name: "Alia", avatar: "https://i.pravatar.cc/40?img=7" }, 
 content: <>Congrats! Looks awesome <FaGift /></>, 
createdAt: "2025-09-19T11:00:00Z" 
 },
 { 
 id: "c2", 
 author: { name: "Aiza", avatar: "https://i.pravatar.cc/40?img=10" }, 
 content: <><FaFire /> <FaFire /> <FaFire /></>, 
 createdAt: "2025-09-19T12:30:00Z"  },
 {
  id: "c3",
 author: { name: "Aliza", avatar: "https://i.pravatar.cc/40?img=13" },
 content: <>This design is super clean <FaRegHandPaper /></>, createdAt: "2025-09-19T13:15:00Z"
 },
 {
id: "c4",
 author: { name: "Sameer", avatar: "https://i.pravatar.cc/40?img=15" },
 content: <>Shared it with my friends, great work <FaRocket /></>,
 createdAt: "2025-09-19T14:05:00Z"
 }
 ]
 },
 {
 id: "p2",
 author: { name: "Alia", avatar: "https://i.pravatar.cc/40?img=7" },
 content: (
 <>
 Just tried baking a cake <FaBirthdayCake /> and it turned out so good!
 </>
),
media: [
 "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=250&fit=crop",
 "https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg"
],
likes: 10,
shares: 6,
tags: ["#Baking", "#Foodie", "#DessertTime"],
createdAt: "2025-09-18T16:30:00Z",
comments: [
 { 
 id: "c5", 
 author: { name: "Rifah", avatar: "https://i.pravatar.cc/40?img=3" }, 
 content: <>Save me a slice <FaBirthdayCake /></>, 
 createdAt: "2025-09-18T17:00:00Z" 
 },
 { 
 id: "c6", 
 author: { name: "Aiza", avatar: "https://i.pravatar.cc/40?img=10" }, 
 content: <>That looks delicious <FaUtensils /></>, 
 createdAt: "2025-09-18T17:20:00Z" 
},
 {
 id: "c7",
 author: { name: "Hamza", avatar: "https://i.pravatar.cc/40?img=11" },
 content: <>Please share the recipe <FaBookOpen /></>,
 createdAt: "2025-09-18T18:00:00Z"
 }
 ]
 },
 {
 id: "p3",
 author: { name: "Aiza", avatar: "https://i.pravatar.cc/40?img=10" },
 content: (
 <>
 Beautiful evening <FaSun /> at the beach today!
 </>
 ),
media: [
 "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=250&fit=crop",
 "https://images.unsplash.com/photo-1493558103817-58b2924bce98?w=400&h=250&fit=crop",
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=250&fit=crop"
 ],
  likes: 20,
 shares: 5,
 tags: ["#BeachLife", "#SunsetLovers", "#Nature"],
 createdAt: "2025-09-17T14:00:00Z",
 comments: [
 {
 id: "c8",
 author: { name: "Alia", avatar: "https://i.pravatar.cc/40?img=7" },
 content: <>This view is breathtaking <FaHeart /></>,
 createdAt: "2025-09-17T14:30:00Z"
 },
 {
 id: "c9",
 author: { name: "Sameer", avatar: "https://i.pravatar.cc/40?img=15" },
 content: <>Wish I was there <FaWaveSquare /></>,
 createdAt: "2025-09-17T15:00:00Z"
 }
 ]
 },
 {
 id: "p4",
 author: { name: "Aliza", avatar: "https://i.pravatar.cc/40?img=13" },
 content: (
 <>
 Finished my new painting <FaPaintBrush />. What do you all think?
</>
 ),
 media: [
 "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=250&fit=crop",
 "https://images.unsplash.com/photo-1533227268428-f9ed0900fb3b?w=400&h=250&fit=crop"
],
likes: 15,
shares: 3,
tags: ["#Art", "#Creative", "#Painting"],
createdAt: "2025-09-16T19:45:00Z",
 comments: [
{ 
 id: "c10", 
 author: { name: "Aiza", avatar: "https://i.pravatar.cc/40?img=10" }, 
 content: <>Wow, this is amazing <FaHeart /></>, 
 createdAt: "2025-09-16T20:00:00Z" 
 },
{
 id: "c11",
author: { name: "Rifah", avatar: "https://i.pravatar.cc/40?img=3" },
content: <>The colors are stunning <FaPalette /></>,
 createdAt: "2025-09-16T20:20:00Z"
 },
 {
  id: "c12",
  author: { name: "Alia", avatar: "https://i.pravatar.cc/40?img=7" },
  content: <>You should exhibit this <FaRegHandPaper /></>,
  createdAt: "2025-09-16T21:00:00Z"
 }
 ]
}
];

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

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