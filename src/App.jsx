import React from "react";
import Navbar from "./component/Navbar";
import "./style/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Item from "./pages/Item";
import Bell from "./pages/Bell";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <div className="box">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Item />} />{" "}
        <Route path="/notification" element={<Bell />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
