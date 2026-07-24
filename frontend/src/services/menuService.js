import axios from "axios";

const API_URL = "http://localhost:5000/api/menu";

// Get Menu Items with Search & Category
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

// Add Menu Item
export const addMenuItem = async (menuData) => {
  return await axios.post(API_URL, menuData);
};