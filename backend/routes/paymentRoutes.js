const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/auth");
const { createPayment, getAllPayments, getUserPayments } = require("../controllers/paymentController");

// Create a payment record (can be called by client after provider response)
router.post("/", async (req, res) => {
  return createPayment(req, res);
});

// Admin: list payments
router.get("/", authenticateUser, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ msg: "Access denied" });
  return getAllPayments(req, res);
});

// Get payments for a user
router.get("/user/:userId", async (req, res) => {
  return getUserPayments(req, res);
});

module.exports = router;
