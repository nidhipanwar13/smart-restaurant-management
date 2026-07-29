const Feedback = require("../models/feedbackModel");
const User = require("../models/user");

// =========================================
// Create Feedback (Customer)
// =========================================
const createFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Rating and comment are required.",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5.",
      });
    }

    // Get logged-in user
    const loggedInUser = await User.findById(req.user.id);

    if (!loggedInUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // One feedback per customer
    const existingFeedback = await Feedback.findOne({
      user: loggedInUser._id,
    });

    if (existingFeedback) {
      return res.status(400).json({
        success: false,
        message: "You have already submitted feedback. You can edit it instead.",
      });
    }

    const newFeedback = await Feedback.create({
      user: loggedInUser._id,
      customerName: loggedInUser.name,
      email: loggedInUser.email,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully.",
      feedback: newFeedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =========================================
// Customer - Get My Feedback
// =========================================
const getMyFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findOne({
      user: req.user.id,
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

// =========================================
// Admin - Get All Feedback
// =========================================
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate("user", "name email")
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

// =========================================
// Get Feedback By ID (Admin)
// =========================================
const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id).populate(
      "user",
      "name email"
    );

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

// =========================================
// Customer - Update Own Feedback
// =========================================
const updateFeedback = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found.",
      });
    }

    if (feedback.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
      });
    }

    if (rating) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: "Rating must be between 1 and 5.",
        });
      }

      feedback.rating = rating;
    }

    if (comment) {
      feedback.comment = comment;
    }

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

// =========================================
// Delete Feedback
// =========================================
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: "Feedback not found.",
      });
    }

    // Admin can delete any feedback
    if (req.user.role === "admin") {
      await feedback.deleteOne();

      return res.status(200).json({
        success: true,
        message: "Feedback deleted successfully.",
      });
    }

    // Customer can delete only own feedback
    if (feedback.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access.",
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

module.exports = {
  createFeedback,
  getMyFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
};