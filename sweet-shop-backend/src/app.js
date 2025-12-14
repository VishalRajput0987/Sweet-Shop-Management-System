


const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const sweetRoutes = require("./routes/sweetRoutes");
const errorHandler = require("./middleware/errorHandler"); 

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Sweet Shop API" });
});

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);
app.use(errorHandler);

module.exports = app;