import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, setSel } from "../store/postSlice";
import "../style/home.css";
import { Oval } from "react-loader-spinner";
import Card from "../component/Card";
import { useAuth } from "../context/AuthContext";
import PostForm from "../component/PostForm";
import CreatePostModel from "../component/CreatePostModal";

const Home = () => {
  const [search, setSearch] = useState("");
  const [expandedPosts, setExpandedPosts] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(setSel({ sel: 1 }));
  }, [dispatch]);

  const handleReadMore = (postId) => {
    setExpandedPosts((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <div className="container">
      <h1 className="title">Social Media For Travellers</h1>
      <div className="search-div">
        <i
          className="fa-solid fa-magnifying-glass icon"
          style={{ color: "#263238" }}
        ></i>
        <input
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          id="search"
          value={search}
          placeholder="Search here ..."
        />
      </div>
      {user && (
        <div className="btn-div">
          <button className="btn-create" type="button" onClick={onOpen}>
            Create Post
            <span className="square">
              {" "}
              <i
                className="fa-solid fa-plus fa-xs"
                style={{ color: "#fcfcfc" }}
              ></i>
            </span>
          </button>
        </div>
      )}

      <CreatePostModel isOpen={isOpen} title="New Post" onClose={onClose}>
        <PostForm />
      </CreatePostModel>

      <div className="post-container">
        {posts.length > 0 ? (
          posts.map((post, inx) => (
            <Card
              key={inx}
              post={post}
              expandedPosts={expandedPosts}
              handleReadMore={handleReadMore}
            />
          ))
        ) : (
          <div className="loading">
            <p>Loading...</p>
            <Oval
              visible={true}
              height="80"
              width="80"
              color="#F05A22"
              secondaryColor="#F05A22"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
