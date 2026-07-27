const orderRoutes = require("./routes/orderRoutes");
const express = require("express");
const cors = require("cors");
const menuRoutes = require("./routes/menuRoutes");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const app = express();
const feedbackRoutes = require("./routes/feedbackRoutes");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Smart Restaurant Management API Running...",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/feedback", feedbackRoutes);

module.exports = app;

