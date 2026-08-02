const Feedback = require("../models/feedbackModel");
const Order = require("../models/Order");

// ======================================================
// Customer - Submit Feedback for an Order
// ======================================================
const createFeedback = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Rating and comment are required.",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    // Only owner can review
    if (order.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    // Only served orders can be reviewed
    if (order.status !== "Served") {
      return res.status(400).json({
        success: false,
        message: "Feedback can only be submitted after the order is served.",
      });
    }

    const existingFeedback = await Feedback.findOne({
      user: req.user.id,
      order: orderId,
    });

    if (existingFeedback) {
      return res.status(400).json({
        success: false,
        message: "Feedback already submitted for this order.",
      });
    }

    const feedback = await Feedback.create({
      user: req.user.id,
      order: orderId,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Customer - Get Feedback By Order
// ======================================================
const getFeedbackByOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const feedback = await Feedback.findOne({
      user: req.user.id,
      order: orderId,
    });

    res.status(200).json({
      success: true,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Customer - Update Feedback
// ======================================================
const updateFeedback = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { rating, comment } = req.body;

    const feedback = await Feedback.findOne({
      user: req.user.id,
      order: orderId,
    });

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found.",
      });
    }

    if (rating) feedback.rating = rating;
    if (comment) feedback.comment = comment;

    await feedback.save();

    res.status(200).json({
      success: true,
      message: "Feedback updated successfully.",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Delete Feedback (Customer/Admin)
// ======================================================
const deleteFeedback = async (req, res) => {
  try {
    const { orderId } = req.params;

    let feedback;

    // Admin can delete any feedback
    if (req.user.role === "admin") {
      feedback = await Feedback.findOne({
        order: orderId,
      });
    } else {
      // Customer can delete only their own feedback
      feedback = await Feedback.findOne({
        user: req.user.id,
        order: orderId,
      });
    }

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found.",
      });
    }

    await feedback.deleteOne();

    res.status(200).json({
      success: true,
      message: "Feedback deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Admin - Get All Feedback
// ======================================================
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate("user", "name email")
      .populate({
        path: "order",
        populate: {
          path: "items.menuItem",
          model: "Menu",
        },
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: feedback.length,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================================
// Admin - Get Feedback By ID
// ======================================================
const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id)
      .populate("user", "name email")
      .populate({
        path: "order",
        populate: {
          path: "items.menuItem",
          model: "Menu",
        },
      });

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found.",
      });
    }

    res.status(200).json({
      success: true,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createFeedback,
  getFeedbackByOrder,
  updateFeedback,
  deleteFeedback,
  getAllFeedback,
  getFeedbackById,
};