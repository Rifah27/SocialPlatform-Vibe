import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaShare, FaComment, FaSmile, FaThumbsUp, FaCommentDots } from "react-icons/fa";
import "../styles/PostCard.css";

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [shared, setShared] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleShare = () => setShared(!shared);
  const toggleComments = () => setShowComments(!showComments);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        author: { name: "You", avatar: "https://via.placeholder.com/40" },
        content: commentText,
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, newComment]);
      setCommentText("");
    }
  };

  const commentIcons = [<FaSmile />, <FaThumbsUp />, <FaCommentDots />];

  return (
    <article className="post-card">
      <header className="post-header">
        <img className="avatar" src={post.author.avatar} alt={post.author.name} />
        <div>
          <h3>{post.author.name}</h3>
          <span>{new Date(post.createdAt).toLocaleString()}</span>
        </div>
      </header>

      <p className="content">{post.content}</p>

      {post.media?.length > 0 && (
        <div className="media-wrapper">
          {post.media.map((img, idx) => (
            <img key={idx} className="media" src={img} alt={`media ${idx}`} />
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
        <span>{comments.length} comments</span>
        <span>{shared ? post.shares + 1 : post.shares} shares</span>
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

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment.id} className="comment">
                <img src={comment.author.avatar} alt={comment.author.name} className="comment-avatar" />
                <div className="comment-content">
                  <h4>{comment.author.name}</h4>
                  <p>
                    {comment.content}{" "}
                    {commentIcons.slice(0, Math.floor(Math.random() * 3) + 1).map((icon, idx) => (
                      <span key={idx} style={{ marginLeft: "4px" }}>{icon}</span>
                    ))}
                  </p>
                  <span>{new Date(comment.createdAt).toLocaleTimeString()}</span>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <input
              type="text"
              placeholder="Write a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit">Post</button>
          </form>
        </div>
      )}
    </article>
  );
}
