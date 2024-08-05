import React from "react";
import more from "../images/more.svg";
import { Link } from "react-router-dom";

const Card = ({ expandedPosts, post, handleReadMore }) => {
  return (
    <div
      className={`card ${expandedPosts[post.id] ? "expanded" : ""}`}
      key={post.id}
    >
      <div className="img-div">
        <img src={`https://picsum.photos/200?random=${post.id}`} alt="" />
      </div>
      <div className="info">
        <div className="left">
          <h3>{post.title.substring(0, 25)}</h3>
          <p className={expandedPosts[post.id] ? "full-text" : ""}>
            {expandedPosts[post.id] ? post.body : post.body.substring(0, 100)}
            <span className="read-more" onClick={() => handleReadMore(post.id)}>
              {expandedPosts[post.id] ? " Show Less" : " Read More..."}
            </span>
          </p>
        </div>
        <div className="right">
          <Link to={`/item/${post.id}`}>
            <img src={more} alt="" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
