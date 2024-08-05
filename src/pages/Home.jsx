import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, setSel } from "../store/postSlice";
import "../style/home.css";
import { Link } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import Card from "../component/Card";

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
          posts.map((post,inx) => (
            <Card key={inx} post={post} expandedPosts={expandedPosts} handleReadMore={handleReadMore} />
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
