const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

// Create a payment record
exports.createPayment = async (req, res) => {
  try {
    const { bookingId, userId, amount, method, status, providerResponse } = req.body;

    if (typeof amount !== "number" || amount < 0) {
      return res.status(400).json({ msg: "Invalid amount" });
    }

    const payment = new Payment({ bookingId, userId, amount, method, status, providerResponse });
    await payment.save();

    // If payment succeeded and bookingId present, mark booking confirmed
    if (bookingId && status === "success") {
      const booking = await Booking.findById(bookingId);
      if (booking) {
        booking.status = "confirmed";
        await booking.save();
      }
    }

    res.status(201).json({ msg: "Payment recorded", payment });
  } catch (err) {
    console.error("Error recording payment:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get payments (admin)
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("bookingId")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get payments for a user
exports.getUserPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.params.userId })
      .populate("bookingId")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    console.error("Error fetching user payments:", err);
    res.status(500).json({ msg: "Server error" });
  }
};
