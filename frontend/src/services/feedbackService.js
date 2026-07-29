import axios from "axios";

const API_URL = "http://localhost:5000/api/feedback";

// Get JWT Token
const getToken = () => {
  return localStorage.getItem("token");
};

// Authorization Header
const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

// ======================================
// Customer APIs
// ======================================

// Submit Feedback
export const submitFeedback = async (feedbackData) => {
  const response = await axios.post(
    API_URL,
    feedbackData,
    authConfig()
  );

  return response.data;
};

// Get Logged-in Customer Feedback
export const getMyFeedback = async () => {
  const response = await axios.get(
    `${API_URL}/my`,
    authConfig()
  );

  return response.data;
};

// Update Feedback
export const updateFeedback = async (id, feedbackData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    feedbackData,
    authConfig()
  );

  return response.data;
};

// Delete Feedback
export const deleteFeedback = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    authConfig()
  );

  return response.data;
};

// ======================================
// Admin APIs
// ======================================

// Get All Feedback
export const getAllFeedback = async () => {
  const response = await axios.get(
    API_URL,
    authConfig()
  );

  return response.data;
};

// Get Feedback By ID
export const getFeedbackById = async (id) => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    authConfig()
  );

  return response.data;
};