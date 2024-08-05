import React, { useState } from "react";
import "../style/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const isAtleast18 = (dob) => {
    const dobDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - dobDate.getFullYear();
    const monthDiff = today.getMonth() - dobDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dobDate.getDate())
    ) {
      return age - 1 >= 18;
    }
    return age >= 18;
  };

  const validateForm = () => {
    if (!name || !email || !dob || !username || !password || !password2) {
      return "All fields are required.";
    }
    if (password !== password2) {
      return "Passwords do not match.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Invalid email format.";
    }
    if (name.length < 6) {
      return "Full name must be at least 6 characters long.";
    }
    if (username.length < 6) {
      return "Username must be at least 6 characters long.";
    }
    if (!isAtleast18(dob)) {
      return "Youre age must be at least 18 years old.";
    }
    return "";
  };

  const formatDOB = (dob) => {
    const dobDate = new Date(dob);
    const day = String(dobDate.getDate()).padStart(2, "0");
    const month = String(dobDate.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = dobDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const formattedDob = formatDOB(dob);
      const res = await signUp(name, email, username, password, formattedDob);
      console.log("success", res);
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") return setName(value);
    if (name === "email") return setEmail(value);
    if (name === "password") return setPassword(value);
    if (name === "password2") return setPassword2(value);
    if (name === "username") return setUsername(value);
    if (name === "dob") return setDob(value);
  };

  return (
    <form action="" id="user-signup" onSubmit={handleSubmit}>
      <h1 className="heading">Sign Up</h1>
      <div className="name-section">
        <label htmlFor="name">Full Name : </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Enter Full Name"
          onChange={handleChange}
          value={name}
        />
      </div>
      <div className="username-section">
        <label htmlFor="username">User Name : </label>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Enter username"
          value={username}
          onChange={handleChange}
        />
      </div>
      <div className="email-section">
        <label htmlFor="email">Email : </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter Email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="dob-section">
        <label htmlFor="dob">Date Of Birth(DOB) : </label>
        <input
          type="date"
          name="dob"
          id="dob"
          onChange={handleChange}
          value={dob}
        />
      </div>
      <div className="password-section">
        <label htmlFor="password">Password : </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter Password"
          value={password}
          onChange={handleChange}
        />
      </div>
      <div className="password2-section">
        <label htmlFor="password2">Confirm Password : </label>
        <input
          type="password"
          name="password2"
          id="password2"
          placeholder="Confirm Password"
          value={password2}
          onChange={handleChange}
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Sign Up</button>
      <Link className="login-link" to="/login">
        Already have an account? Login Here.
      </Link>
    </form>
  );
};

export default SignUp;
