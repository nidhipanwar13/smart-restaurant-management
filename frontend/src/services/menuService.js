import axios from "axios";

const API = "http://localhost:5000/api/menu";

// Get all menu items
export const getAllMenuItems = async (search = "", category = "All") => {
  const response = await axios.get(API, {
    params: {
      search,
      category,
    },
  });

  return response.data;
};

// Get menu item by ID
export const getMenuItemById = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data;
};

// Add menu item
export const addMenuItem = async (menuData) => {
  const response = await axios.post(API, menuData);
  return response.data;
};

// Update menu item
export const updateMenuItem = async (id, menuData) => {
  const response = await axios.put(`${API}/${id}`, menuData);
  return response.data;
};

// Delete menu item
export const deleteMenuItem = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};