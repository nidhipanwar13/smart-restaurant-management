import axios from "axios";

const API_URL = "http://localhost:5000/api/feedback";

// ======================================
// JWT Token
// ======================================

const getToken = () => {
  return localStorage.getItem("token");
};

const authConfig = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  },
});

// ======================================
// Customer APIs
// ======================================

// Submit Feedback for an Order
export const submitFeedback = async (orderId, feedbackData) => {
  const response = await axios.post(
    `${API_URL}/order/${orderId}`,
    feedbackData,
    authConfig()
  );

  return response.data;
};

// Get Feedback of an Order
export const getFeedbackByOrder = async (orderId) => {
  const response = await axios.get(
    `${API_URL}/order/${orderId}`,
    authConfig()
  );

  return response.data;
};

// Update Feedback
export const updateFeedback = async (orderId, feedbackData) => {
  const response = await axios.put(
    `${API_URL}/order/${orderId}`,
    feedbackData,
    authConfig()
  );

  return response.data;
};

// Delete Feedback
export const deleteFeedback = async (orderId) => {
  const response = await axios.delete(
    `${API_URL}/order/${orderId}`,
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