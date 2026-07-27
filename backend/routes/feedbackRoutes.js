const express = require("express");

const {
  createFeedback,
  getAllFeedback,
  getFeedbackById,
  updateFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController");

const router = express.Router();

router.post("/", createFeedback);
router.get("/", getAllFeedback);
router.get("/:id", getFeedbackById);
router.put("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

module.exports = router;