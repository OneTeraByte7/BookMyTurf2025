const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Models
const User = require("./models/User");
const Booking = require("./models/Booking");

// Routes
const authRoutes = require("./routes/authRoutes");
const turfRoutes = require("./routes/turfRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// Middleware
app.use(express.json());
app.use(cors());

// Authentication Middleware
const authenticateUser = require("./middleware/auth");

// API Routes
app.use("/api/auth", authRoutes);           // Auth routes (login/signup)
app.use("/api/turfs", turfRoutes);          // Turf routes (get/add turfs)
app.use("/api/bookings", bookingRoutes);    // Booking routes (store bookings)

// Get logged-in user by ID (for dashboard name, profile, etc.)
app.get("/api/auth/user/:id", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email role");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Start Express Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
