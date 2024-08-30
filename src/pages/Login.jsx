import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";
import { Oval } from "react-loader-spinner";
import { fetchUser } from "../store/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const { login } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    setLoading(true); // Set loading state to true

    if (!validateEmail(email)) {
      setLoading(false); // Set loading state to false
      return setError("Please enter a valid email address.");
    }

    if (password.length < 6) {
      setLoading(false); // Set loading state to false
      return setError("Password must be at least 6 characters long.");
    }

    try {
      await login(email, password);
      dispatch(fetchUser());
      setEmail("");
      setPassword("");
      navigate("/");
    } catch (error) {
      setEmail("");
      setPassword("");
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <>
      {loading ? (
        <div className="loader-div">
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
      ) : (
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
      )}
    </>
  );
};

export default Login;
