const Feedback = require("../models/feedbackModel");

// Create Feedback
const createFeedback = async (req, res) => {
  try {
    const { customerName, email, rating, feedback, visitDate, status } = req.body;

    // Validation
    if (!customerName || !email || !rating || !feedback || !visitDate) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5",
      });
    }

    // Duplicate feedback check
    const existingFeedback = await Feedback.findOne({
      email,
      visitDate,
    });

    if (existingFeedback) {
      return res.status(400).json({
        message: "Feedback for this visit already exists",
      });
    }

    const newFeedback = await Feedback.create({
      customerName,
      email,
      rating,
      feedback,
      visitDate,
      status,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback: newFeedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });

    res.status(200).json({
      count: feedback.length,
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Feedback By ID
const getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Feedback
const updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedFeedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      message: "Feedback updated successfully",
      feedback: updatedFeedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Feedback
const deleteFeedback = async (req, res) => {
  try {
    const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);

    if (!deletedFeedback) {
      return res.status(404).json({
        message: "Feedback not found",
      });
    }

    res.status(200).json({
      message: "Feedback deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
};