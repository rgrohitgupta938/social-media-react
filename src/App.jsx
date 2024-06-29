import React from "react";
import Navbar from "./Navbar";
import "./style/App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Item from "./Item";
import Bell from "./Bell";
import Profile from "./Profile";

const App = () => {
  return (
    <div className="box">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<Item />} />{" "}
        <Route path="/notification" element={<Bell />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default App;
