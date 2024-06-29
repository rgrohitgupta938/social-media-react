import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, setSel } from "./store/postSlice";
import "./style/home.css";
import more from "./images/more.svg";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";

const Home = () => {
  const [search, setSearch] = useState("");
  const [expandedPosts, setExpandedPosts] = useState({});

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
      <div className="post-container">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              className={`card ${expandedPosts[post.id] ? "expanded" : ""}`}
              key={post.id}
            >
              <div className="img-div">
                <img
                  src={`https://picsum.photos/200?random=${post.id}`}
                  alt=""
                />
              </div>
              <div className="info">
                <div className="left">
                  <h3>{post.title.substring(0, 25)}</h3>
                  <p className={expandedPosts[post.id] ? "full-text" : ""}>
                    {expandedPosts[post.id]
                      ? post.body
                      : post.body.substring(0, 100)}
                    <span
                      className="read-more"
                      onClick={() => handleReadMore(post.id)}
                    >
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
