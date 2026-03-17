const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

// Routes
const authRoutes = require("./routes/authRoutes");
const turfRoutes = require("./routes/turfRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const eventRoutes = require("./routes/eventRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`📍 ${req.method} ${req.url}`);
  next();
});

// Authentication Middleware
const authenticateUser = require("./middleware/auth");

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/turfs", turfRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/payments", paymentRoutes);

console.log("✅ Routes registered:");
console.log("   - /api/auth");
console.log("   - /api/turfs");
console.log("   - /api/bookings");
console.log("   - /api/events");
console.log("   - /api/payments");

// Health Check
app.get("/", (req, res) => {
  res.json({ msg: "BookMyTurf API is running", status: "OK" });
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
const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error("❌ MONGO_URI is not set. Set MONGO_URI in your .env file and restart the server.");
  process.exit(1);
}

mongoose.connect(mongoUri, {
  // Recommended options for stable connections
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000,
})
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    // Exit - app cannot function without DB
    process.exit(1);
  });

// Start Express Server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Graceful shutdown on SIGINT/SIGTERM
const shutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    mongoose.connection.close(false, () => {
      console.log('MongoDB connection closed.');
      process.exit(0);
    });
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));

module.exports = app;
