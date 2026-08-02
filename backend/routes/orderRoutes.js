const express = require("express");

const router = express.Router();

const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

/*
=================================================
Customer Routes
=================================================
*/

// Customer can create an order
router.post("/", protect, createOrder);

// Customer gets only their own orders
// Admin gets all orders
router.get("/", protect, getAllOrders);

// Customer can view their own order
// Admin can view any order
router.get("/:id", protect, getOrderById);

/*
=================================================
Admin Routes
=================================================
*/

// Admin updates order status
router.put("/:id", protect, admin, updateOrder);

// Admin deletes orders
router.delete("/:id", protect, admin, deleteOrder);

module.exports = router;