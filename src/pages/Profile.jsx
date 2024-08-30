import React, { useEffect, useState } from "react";
import "../style/home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../style/proflie.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, removeUser } from "../store/userSlice";
import CreatePostModal from "../component/CreatePostModal";

const Profile = () => {
  const { user, logout } = useAuth();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const userError = useSelector((state) => state.user.error);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(fetchUser());
    }
  }, [user, navigate, dispatch]);

  useEffect(() => {
    if (userError === "failed") {
      console.error("Error fetching user data:", userError);
      localStorage.removeItem("user");
      navigate("/login");
    }
  }, [userError, navigate]);

  const handleEditModalOpen = () => setShow(true);
  const handleEditModalClose = () => setShow(false);

  const handleLogout = () => {
    logout();
    dispatch(removeUser());
    console.log("logout");
    navigate("/");
  };

  const handleSubmit = () => {
    console.log("Submit");
  };

  console.log(userData);

  return (
    <div className="container">
      <div className="profile-container">
        <div className="left">
          <div className="edit" onClick={handleEditModalOpen}>
            {" "}
            <i
              className="fa-solid fa-pen-to-square"
              style={{ color: "#f0a522" }}
            ></i>
          </div>
          <div className="profile-image">
            <img src={userData?.userImage} /> {/* Update path accordingly */}
            <div className="overlay-text">
              {userData?.userImage || "Add Profile Image"}
            </div>
          </div>
          <div className="profile-details">
            <h4>{userData?.name || "Name"}</h4>
            <h4>{userData?.username || "User Name"}</h4>
            <p className="bio">{userData?.bio || "No bio available."}</p>
            <p className="phoneno">{userData?.number || "Add Mobile No"} </p>
            <p className="email">{userData?.email || "Email not provided"}</p>
          </div>
          <div className="profile-rest">
            <div className="followers bold">
              Followers
              <div className="center">{userData?.followers?.length || 0}</div>
            </div>
            <div className="following bold">
              Following
              <div className="center">{userData?.following?.length || 0}</div>
            </div>
            <div className="posts bold">
              Posts
              <div className="center">20</div>{" "}
              {/* Replace with actual data if available */}
            </div>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="right"></div>
      </div>
      <div className="edit-modal">
        <CreatePostModal
          isOpen={show}
          title="Edit"
          onClose={handleEditModalClose}
        >
          <form id="edit-form" onSubmit={handleSubmit}>
            <div className="name-section">
              <label htmlFor="name">Name:</label>
              <input
                readOnly
                type="text"
                value={userData?.name}
                name="name"
                id="name"
              />
            </div>
            <div className="username-section">
              <label htmlFor="username">UserName:</label>
              <input
                type="text"
                value={userData?.username}
                name="username"
                id="username"
                readOnly
              />
            </div>
            <div className="email-section">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                value={userData?.email}
                name="email"
                id="email"
                readOnly
              />
            </div>
            <div className="bio-section">
              <label htmlFor="bio">Bio:</label>
              <textarea
                className="bio-area"
                name="bio"
                id="bio"
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="number-section">
              <label htmlFor="email">Number:</label>
              <input
                type="number"
                value={userData?.number}
                name="number"
                id="number"
              />
            </div>
          </form>
        </CreatePostModal>
      </div>
    </div>
  );
};

export default Profile;
