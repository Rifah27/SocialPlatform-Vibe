import React, { useState } from "react"; 
import { FaHeart, FaRegHeart, FaShare, FaComment } from "react-icons/fa";
import "../styles/PostCard.css";

export default function PostCard({ post, currentUser }) {
  const [liked, setLiked] = useState(post.likes?.includes(currentUser?._id));
  const [likesCount, setLikesCount] = useState(post.likes?.length || 0);
  const [shared, setShared] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch(`http://localhost:5000/api/posts/like/${post._id}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) {
        setLiked(!liked);
        setLikesCount(data.length);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = () => setShared(!shared);
  const toggleComments = () => setShowComments(!showComments);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isFeatured = likesCount > 20;

  return (
    <article className={`post-card-premium ${isFeatured ? "featured" : ""}`}>
      {/* Immersive Media Background / Container */}
      <div className="post-media-container">
        {post.media?.length > 0 ? (
          <img src={post.media[0]} alt="Post Content" className="main-media" />
        ) : (
          <div className="text-bg-gradient"></div>
        )}
        
        {/* Floating Author Badge */}
        <div className="author-badge-glass">
          <img className="author-avatar" src={post.author?.avatar || "https://i.pravatar.cc/150?u=" + post.author?.username} alt={post.author?.username} />
          <div className="author-meta">
            <h4>{post.author?.username || "Unknown"}</h4>
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>

        {/* Featured Tag */}
        {isFeatured && <div className="trending-tag">Trending</div>}
      </div>

      <div className="post-body">
        <p className="post-content-text">{post.content}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="post-tags-list">
            {post.tags.map((tag, idx) => (
              <span key={idx} className="glass-tag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      <footer className="post-actions-acrylic">
        <div className="action-stats">
          <div className={`stat-item ${liked ? "liked" : ""}`} onClick={handleLike}>
            {liked ? <FaHeart className="pop-icon" /> : <FaRegHeart />}
            <span>{likesCount}</span>
          </div>
          <div className="stat-item" onClick={toggleComments}>
            <FaComment />
            <span>{post.comments?.length || 0}</span>
          </div>
        </div>

        <button className={`share-btn-minimal ${shared ? "shared" : ""}`} onClick={handleShare}>
          <FaShare />
        </button>
      </footer>

      {showComments && post.comments && (
        <div className="post-comments-drawer">
          {post.comments.map((comment, idx) => (
            <div key={idx} className="comment-line">
              <img className="comment-avatar-mini" src={comment.user?.avatar || "https://i.pravatar.cc/150?u=" + comment.user?.username} alt={comment.user?.username} />
              <div className="comment-content">
                <strong>{comment.user?.username}</strong>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
