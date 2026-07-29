const express = require("express");

const {
  createFeedback,
  getMyFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController");

const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

/*
=========================================
Customer Routes
=========================================
*/

// Submit Feedback
router.post("/", protect, createFeedback);

// Get Logged-in Customer Feedback
router.get("/my", protect, getMyFeedback);

// Update Own Feedback
router.put("/:id", protect, updateFeedback);

// Delete Own Feedback
router.delete("/:id", protect, deleteFeedback);

/*
=========================================
Admin Routes
=========================================
*/

// View All Customer Feedback
router.get("/", protect, admin, getAllFeedback);

// View Feedback By ID
router.get("/:id", protect, admin, getFeedbackById);

module.exports = router;