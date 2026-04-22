import React, { useState } from "react"; 
import { FaHeart, FaRegHeart, FaShare, FaComment } from "react-icons/fa";
import "../styles/PostCard.css";

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleShare = () => setShared(!shared);
  const toggleComments = () => setShowComments(!showComments);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  const isFeatured = post.likes > 20;

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
          <img className="author-avatar" src={post.author.avatar} alt={post.author.name} />
          <div className="author-meta">
            <h4>{post.author.name}</h4>
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>

        {/* Featured Tag */}
        {isFeatured && <div className="trending-tag">Trending</div>}
      </div>

      <div className="post-body">
        <p className="post-content-text">{post.content}</p>
        
        {post.tags && (
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
            <span>{liked ? post.likes + 1 : post.likes}</span>
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
          {post.comments.map((comment) => (
            <div key={comment.id} className="comment-line">
              <img className="comment-avatar-mini" src={comment.author.avatar} alt={comment.author.name} />
              <div className="comment-content">
                <strong>{comment.author.name}</strong>
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

