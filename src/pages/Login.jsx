import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateEmail = (email) => {
    // Basic email regex
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") return setEmail(value);
    if (name === "password") return setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!validateEmail(email)) {
      return setError("Please enter a valid email address.");
    }

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    try {
      await login(email, password);
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <>
      <form action="" id="user-login" onSubmit={handleSubmit}>
        <h1 className="heading">Login</h1>

        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          onChange={handleChange}
          value={email}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          onChange={handleChange}
          value={password}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" id="btn submit">
          Login
        </button>
        <Link className="signup-link" to="/signup">
          New User? Sign Up
        </Link>
      </form>
    </>
  );
};

export default Login;
