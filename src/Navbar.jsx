import React, { useEffect, useState } from "react";
import "./style/navbar.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSel } from "./store/postSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const sel = useSelector((state) => state.posts.sel);
  useEffect(() => {}, [sel]);

  return (
    <div>
      <nav className="navbar-new">
        <div className="start">
          <Link className="nav-link" to="/">TravelMedia.in</Link>
        </div>
        <div className="center">
          <div
            onClick={() => dispatch(setSel({ sel: 1 }))}
            className={sel === 1 ? "active" : ""}
          >
            <Link to="/">
              {" "}
              <i
                className="fa-solid fa-house fa-lg op"
                style={{ color: "#f05a22" }}
              ></i>
            </Link>
          </div>
          <div
            onClick={() => dispatch(setSel({ sel: 2 }))}
            className={sel === 2 ? "active" : ""}
          >
            <Link to="/notification">
              {" "}
              <i
                className="fa-solid fa-bell fa-lg op"
                style={{ color: "#f05a22" }}
              ></i>
            </Link>
          </div>
          <div
            onClick={() => dispatch(setSel({ sel: 3 }))}
            className={sel === 3 ? "active" : ""}
          >
            <Link to="/item/1">
              {" "}
              <i
                className="fa-solid fa-bookmark fa-lg op"
                style={{ color: "#f05a22" }}
              ></i>
            </Link>
          </div>
          <div
            onClick={() => dispatch(setSel({ sel: 4 }))}
            className={sel === 4 ? "active" : ""}
          >
            <Link to="/profile">
              {" "}
              <i
                className="fa-solid fa-user fa-lg op"
                style={{ color: "#f05a22" }}
              ></i>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
