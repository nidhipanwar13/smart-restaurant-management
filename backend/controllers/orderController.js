const Order = require("../models/Order");

// =========================================
// Get Orders
// Admin -> All Orders
// Customer -> Own Orders
// =========================================
const getAllOrders = async (req, res) => {
  try {
    let orders;

    if (req.user.role === "admin") {
      orders = await Order.find()
        .populate("user", "name email")
        .populate("items.menuItem")
        .sort({ createdAt: -1 });
    } else {
      orders = await Order.find({
        user: req.user.id,
      })
        .populate("items.menuItem")
        .sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Get Single Order
// =========================================
const getOrderById = async (req, res) => {
  try {
    let order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("items.menuItem");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    if (
      req.user.role !== "admin" &&
      order.user._id.toString() !== req.user.id
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Create Order
// =========================================
const createOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerPhone,
      specialInstructions,
      items,
      totalAmount,
    } = req.body;

    const order = await Order.create({
      user: req.user.id,
      customerName,
      customerPhone,
      specialInstructions,
      items,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Update Order (Admin Only)
// =========================================
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    ).populate("items.menuItem");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated successfully.",
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Delete Order (Admin Only)
// =========================================
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};