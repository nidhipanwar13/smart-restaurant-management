const express = require("express");

const router = express.Router();

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Welcome Customer",
    user: req.user,
  });
});

router.get("/admin", protect, admin, (req, res) => {
  res.json({
    message: "Welcome Admin",
  });
});

module.exports = router;

