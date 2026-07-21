
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Smart Restaurant Management API Running...",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/test", testRoutes);


module.exports = app;

