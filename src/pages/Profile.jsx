import React, { useEffect } from "react";
import "../style/home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../style/proflie.css";

const Profile = () => {
  const { user, logout } = useAuth();
  console.log(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login");
  }, [user, navigate]);

  const profile = () => {
    return (
      <div className="profile-container">
        <div className="left">
          <h1 className="profile-heading">Profile</h1>
          <div className="profile-image">
            <img src="public\3.jpg" alt="" />
          </div>
          <div className="profile-details">
            <h4>Hello</h4>
            <p>Bio</p>
            <p className="phoneno">723427</p>
            <p className="email">sfdhsdghsfd</p>
          </div>
          <div className="profile-rest">
            <p className="followers">
              Followers
              <div
                className="center
              "
              >
                10
              </div>
            </p>
            <p className="following">
              Folloing<div className="center">20</div>
            </p>
            <p className="posts">
              Posts
              <div className="center">20</div>
            </p>
          </div>
          <button onClick={logout}>Logout</button>
        </div>
        <div className="right"></div>
      </div>
    );
  };
  return <div className="container">{profile()}</div>;
};

export default Profile;
