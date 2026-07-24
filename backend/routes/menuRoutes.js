const express = require("express");

const router = express.Router();

const {
  addMenuItem,
  getAllMenuItems,
  getMenuItemById,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/menuController");

// Add Menu
router.post("/", addMenuItem);

// Get All + Search + Filter
router.get("/", getAllMenuItems);

// Get By Id
router.get("/:id", getMenuItemById);

// Update
router.put("/:id", updateMenuItem);

// Delete
router.delete("/:id", deleteMenuItem);

module.exports = router;