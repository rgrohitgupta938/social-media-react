import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_API_URL;
console.log(BASE_URL);

// Safely retrieve and parse the token from localStorage
const getAuthToken = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.token || "null"; // Return 'null' if token is not found
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return "null"; // Default token value
  }
};

export const get = async (url, params) => {
  try {
    const res = await axios.get(`${BASE_URL}${url}`, {
      params,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

export const post = async (url, data) => {
  try {
    const res = await axios.post(`${BASE_URL}${url}`, data, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    return res.data;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};

export const put = async (url, data) => {
  try {
    const res = await axios.put(`${BASE_URL}${url}`, data, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("PUT request error:", error);
    throw error;
  }
};

export const del = async (url, params) => {
  try {
    const res = await axios.delete(`${BASE_URL}${url}`, {
      params,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("DELETE request error:", error);
    throw error;
  }
};
