import React, { useState } from "react";
import "../style/postform.css";
import { useAuth } from "../context/AuthContext";
import { postPost } from "../store/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PostForm = ({ onClose }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const { user } = useAuth();
  const { userId } = user;
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Select the status from the store
  const postStatus = useSelector((state) => state.posts.postStatus);
  const postError = useSelector((state) => state.posts.postError);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((e.target.files && e.target.files[0]) || name === "image")
      return setImage(e.target.files[0]);
    if (name === "content") return setContent(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validation
    if (!content.trim() || !image) {
      setError("Both image and content are required.");
      return;
    }
    try {
      // Clear previous error
      setError(null);
      // Dispatch post action and wait for it to complete
      const res = await dispatch(
        postPost({ userId, postImage: image, content })
      ).unwrap();
      console.log(res);
      // Navigate after successful post creation
      console.log(postStatus, postError);
      if (postStatus === "succeeded") {
        onClose();
      } else if (postStatus === "rejected") {
        setError(postError);
      }
    } catch (error) {
      console.error("Failed to post:", error);
    }
  };

  const handleRemove = () => setImage(null);

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div className="form-group">
        {!image && (
          <input
            type="file"
            name="image"
            onChange={handleChange}
            id="image"
            accept="image/*"
            required
          />
        )}
        {image && (
          <div className="pos">
            <div className="post-prev-dis">
              <img src={URL.createObjectURL(image)} alt="Preview" />
            </div>
            <div onClick={handleRemove} className="image-change">
              &times;
            </div>
          </div>
        )}
      </div>
      <div className="form-group">
        <textarea
          name="content"
          id="content"
          value={content}
          onChange={handleChange}
          cols="30"
          rows="10"
          placeholder="Write your post content here..."
        ></textarea>
      </div>
      <button className="btn-post" type="submit">
        Post
        <span>
          <i
            className="fa-regular fa-paper-plane fa-beat"
            style={{ color: "#fcfcfc" }}
          ></i>
        </span>
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default PostForm;
