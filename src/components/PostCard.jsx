import React, { useState } from "react"; 
import { FaHeart, FaRegHeart, FaShare, FaComment } from "react-icons/fa";
import "../styles/PostCard.css";

// Helper function to check if a URL is likely a video based on extension
const isVideo = (url) => {
    // Checks for common video extensions (case-insensitive)
    return /\.(mp4|webm|ogg|mov|avi)$/i.test(url);
};

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleShare = () => setShared(!shared);
  const toggleComments = () => setShowComments(!showComments);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  return (
    <article className="post-card">
      <header className="post-header">
        <img className="avatar" src={post.author.avatar} alt={post.author.name} />
        <div>
          <h3>{post.author.name}</h3>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </header>

      <p className="content">{post.content}</p>

      {post.media?.length > 0 && (
        <div className="media-wrapper">
          {post.media.map((mediaUrl, idx) => (
            // Conditional rendering for Video or Image based on URL extension
            isVideo(mediaUrl) ? (
              <video
                key={idx}
                className="media video-player"
                src={mediaUrl}
                controls
                loop
                muted
                playsInline
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                key={idx} 
                className="media" 
                src={mediaUrl} 
                alt={`media ${idx}`} 
              />
            )
          ))}
        </div>
      )}

      {post.tags && (
        <div className="tags">
          {post.tags.map((tag, idx) => (
            <span key={idx} className="tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="post-stats">
        <span>{liked ? post.likes + 1 : post.likes} likes</span>
        <span>{post.shares} shares</span>
        {/* The counts remain visible */}
      </div>

      <footer className="actions">
        <button onClick={handleLike} className={liked ? "active" : ""}>
          {liked ? <FaHeart /> : <FaRegHeart />} Like
        </button>
        <button onClick={toggleComments}>
          <FaComment /> Comments
        </button>
        <button onClick={handleShare} className={shared ? "active" : ""}>
          <FaShare /> Share
        </button>
      </footer>

      {/* The comments rendering section is intentionally removed */}
    </article>
  );
}