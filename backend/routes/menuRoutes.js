const express = require("express");

const router = express.Router();

const {
  addMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
  searchMenuItems,
  filterMenuByCategory,
} = require("../controllers/menuController");

// Add Menu Item
router.post("/", addMenuItem);
// Get All Menu Items
router.get("/", getAllMenuItems);
// Search route FIRST 
router.get("/search", searchMenuItems); 
router.get("/category/:category", filterMenuByCategory);
// Get Menu Item By ID
router.get("/:id", getMenuItemById);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

module.exports = router;

