const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

// Models
const User = require("./models/User");
const Booking = require("./models/Booking");

// Routes
const authRoutes = require("./routes/authRoutes");
const turfRoutes = require("./routes/turfRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const eventRoutes = require("./routes/eventRoutes"); // ➡️ NEW (for Host Event feature)

// Middleware
app.use(express.json({ limit: '10mb' })); // ➡️ Safe body limit
app.use(cors());
app.use(morgan("dev")); // ➡️ Logs all API requests
app.use(helmet());      // ➡️ Security headers

// Authentication Middleware
const authenticateUser = require("./middleware/auth");

// API Routes
app.use("/api/auth", authRoutes);           // Auth routes (login/signup)
app.use("/api/turfs", turfRoutes);          // Turf routes (get/add turfs)
app.use("/api/bookings", bookingRoutes);    // Booking routes (store bookings)
app.use("/api/events", eventRoutes);        // ➡️ Event routes (create/get events)

// Get logged-in user by ID (for dashboard/profile)
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

// 404 Route (Unknown API Endpoints)
app.use((req, res, next) => {
  res.status(404).json({ msg: "API endpoint not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Global Error Handler:", err.stack);
  res.status(500).json({ msg: "Something went wrong on the server." });
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
