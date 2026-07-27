import axios from "axios";

const API_URL = "http://localhost:5000/api/feedback";

// Create Feedback
export const createFeedback = async (feedbackData) => {
  const response = await axios.post(API_URL, feedbackData);
  return response.data;
};

// Get All Feedback
export const getAllFeedback = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get Feedback By ID
export const getFeedbackById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update Feedback
export const updateFeedback = async (id, feedbackData) => {
  const response = await axios.put(`${API_URL}/${id}`, feedbackData);
  return response.data;
};

// Delete Feedback
export const deleteFeedback = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};