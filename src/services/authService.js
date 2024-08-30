import axios from "axios";

const API_URL = import.meta.env.VITE_APP_API_URL;

console.log(API_URL, import.meta.env.VITE_APP_API_URL);
const signUp = async (name, email, username, password, dob) => {
  try {
    const response = await axios.post(`${API_URL}/user/register`, {
      name,
      email,
      username,
      password,
      dob,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Signup failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("Error in setting up the request. Please try again.");
    }
  }
};

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/user/login`, {
      email,
      password,
    });
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again later.");
    } else {
      throw new Error("Error in setting up the request. Please try again.");
    }
  }
};

const logOut = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

const authService = {
  signUp,
  login,
  logOut,
  getCurrentUser,
};

export default authService;
