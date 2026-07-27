import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

// Register
export const registerUser = (userData) => {
  return axios.post(`${API_URL}/register`, userData);
};

// Login
export const loginUser = (userData) => {
  return axios.post(`${API_URL}/login`, userData);
};

// Get Logged-in User
export const getProfile = (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

