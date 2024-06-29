import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPosts, setSel } from "./store/postSlice";
import { Link } from "react-router-dom";
import "./style/item.css";
import more from "./images/more.svg";
import { Oval } from "react-loader-spinner";

const Item = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.items);
  const [selBtn, setSelBtn] = useState(1);
  const remaningPost = posts.filter((i) => +i.id !== +id);
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    if (posts.length === 0) {
      dispatch(fetchPosts());
    }
    dispatch(setSel({ sel: 3 }));
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const handleReadMore = (postId) => {
    setExpandedPosts((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const postForDetails = posts.find((post) => post.id === +id);

  const postTitle = postForDetails ? postForDetails.title.substring(0, 25) : "";

  return (
    <div id="item" className="container">
      <h1 className="heading">
        <span className="back" onClick={() => navigate("/")}>
          <i
            className="fa-solid fa-arrow-left fa-2xs arrow"
            style={{ color: "#3e3e3e" }}
          ></i>
        </span>
        Post Number #{id}
      </h1>
      <div className="post-details">
        {postForDetails ? (
          <>
            <div className="left-details">
              <div className="img-left-div">
                <img
                  src={`https://picsum.photos/200?random=${postForDetails.id}`}
                  alt=""
                />
              </div>
              <div className="img-details">
                <span id="title">{postTitle}</span>
                <span className="icons">
                  <i
                    className="fa-solid fa-share-nodes fa-lg"
                    style={{ color: "#ffffff" }}
                  ></i>
                  <i
                    className="fa-regular fa-heart fa-lg"
                    style={{ color: "#ffffff" }}
                  ></i>
                </span>
              </div>
            </div>
            <div className="right-details">
              <div className="btn-grp">
                <button
                  onClick={() => setSelBtn(1)}
                  className={selBtn === 1 ? "btn active" : "btn"}
                >
                  Details
                </button>
                <button
                  onClick={() => setSelBtn(2)}
                  className={selBtn === 2 ? "btn active" : "btn"}
                >
                  User Info
                </button>
              </div>
              {selBtn === 1 && (
                <div className="post-img-details">{postForDetails.body}</div>
              )}
              {selBtn === 2 && (
                <div className="user-details">
                  Post was posted by user {postForDetails.userId}
                </div>
              )}
            </div>
          </>
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
      <h2 id="more-post">More Posts</h2>
      <div className="more-details post-container">
        {remaningPost.length > 0 ? (
          remaningPost.map((post) => (
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

export default Item;
