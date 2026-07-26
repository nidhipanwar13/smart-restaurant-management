import axios from "axios";

const API_URL = "http://localhost:5000/api/menu";

// Get Menu Items
export const getMenuItems = async (
  search = "",
  category = "All"
) => {

  let url = API_URL;

  const params = [];

  if (search.trim() !== "") {
    params.push(`search=${encodeURIComponent(search)}`);
  }

  if (category !== "All") {
    params.push(`category=${encodeURIComponent(category)}`);
  }

  if (params.length > 0) {
    url += `?${params.join("&")}`;
  }

  return await axios.get(url);
};

// Add Menu
export const addMenuItem = async (menuData) => {
  return await axios.post(API_URL, menuData);
};

// ✅ Update Menu
export const updateMenuItem = async (id, menuData) => {
  return await axios.put(`${API_URL}/${id}`, menuData);
};

// Delete Menu
export const deleteMenuItem = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};