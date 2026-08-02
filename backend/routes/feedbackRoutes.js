const express = require("express");

const router = express.Router();

const {
  createFeedback,
  getFeedbackByOrder,
  updateFeedback,
  deleteFeedback,
  getAllFeedback,
  getFeedbackById,
} = require("../controllers/feedbackController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

/*
=================================================
Customer Routes
=================================================
*/

// Submit feedback for a specific order
router.post("/order/:orderId", protect, createFeedback);

// Get feedback for a specific order
router.get("/order/:orderId", protect, getFeedbackByOrder);

// Update feedback for a specific order
router.put("/order/:orderId", protect, updateFeedback);

// Delete feedback for a specific order
router.delete("/order/:orderId", protect, deleteFeedback);

/*
=================================================
Admin Routes
=================================================
*/

// Get all feedback
router.get("/", protect, admin, getAllFeedback);

// Get feedback by feedback ID
router.get("/:id", protect, admin, getFeedbackById);

module.exports = router;