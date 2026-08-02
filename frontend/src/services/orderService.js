import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

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
// Get Orders
// ======================================

export const getOrders = async () => {
  const response = await axios.get(
    API_URL,
    authConfig()
  );

  return response.data;
};

// ======================================
// Get Order By ID
// ======================================

export const getOrderById = async (id) => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    authConfig()
  );

  return response.data;
};

// ======================================
// Create Order
// ======================================

export const createOrder = async (orderData) => {
  const response = await axios.post(
    API_URL,
    orderData,
    authConfig()
  );

  return response.data;
};

// ======================================
// Update Order
// ======================================

export const updateOrder = async (id, orderData) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    orderData,
    authConfig()
  );

  return response.data;
};

// ======================================
// Delete Order
// ======================================

export const deleteOrder = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    authConfig()
  );

  return response.data;
};