const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  createAdmin,
} = require("../controllers/authControllers");

console.log({
  registerUser,
  loginUser,
  getProfile,
  createAdmin,
});

const { protect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/create-admin", createAdmin);

router.get("/profile", protect, getProfile);

module.exports = router;
