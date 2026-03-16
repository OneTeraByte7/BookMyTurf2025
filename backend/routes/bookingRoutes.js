const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Turf = require("../models/turf");
const Payment = require("../models/Payment");
const authenticateUser = require("../middleware/auth");

// Create Booking (with optional authentication)
router.post("/", async (req, res) => {
  const { turfId, date, timeSlot, userId } = req.body;

  console.log("Booking received:", { turfId, date, timeSlot, userId });

  if (!turfId || !date || !timeSlot) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  try {
    const turf = await Turf.findById(turfId);
    if (!turf) {
      return res.status(404).json({ msg: "Turf not found" });
    }

    // Check if slot is already booked
    const existingBooking = await Booking.findOne({ turfId, date, timeSlot });
    if (existingBooking) {
      return res.status(400).json({ msg: "This time slot is already booked" });
    }

    const totalPrice = turf.pricePerHour;

    const newBooking = new Booking({
      turfId,
      userId: userId || null,
      date,
      timeSlot,
      totalPrice,
      status: "pending",
    });

    await newBooking.save();

    // If client supplied payment info, persist it and update booking status on success
    if (req.body.payment) {
      try {
        const { amount, method, status, providerResponse } = req.body.payment;
        const paymentRecord = new Payment({
          bookingId: newBooking._id,
          userId: userId || null,
          amount: typeof amount === 'number' ? amount : totalPrice,
          method: method || 'card',
          status: status || 'pending',
          providerResponse: providerResponse || {},
        });

        await paymentRecord.save();

        if (paymentRecord.status === 'success') {
          newBooking.status = 'confirmed';
          await newBooking.save();
        }

        console.log("Booking and payment saved:", newBooking, paymentRecord);
        return res.status(201).json({ msg: "Booking created", booking: newBooking, payment: paymentRecord });
      } catch (pErr) {
        console.error("Error saving payment:", pErr);
        // still return booking saved but indicate payment error
        return res.status(201).json({ msg: "Booking created (payment failed)", booking: newBooking });
      }
    }

    console.log("Booking saved:", newBooking);
    res.status(201).json({ 
      msg: "Booking created successfully",
      booking: newBooking 
    });
  } catch (err) {
    console.error("Error saving booking:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get all bookings (admin only)
router.get("/", authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const bookings = await Booking.find()
      .populate("turfId", "turfName location pricePerHour")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get user's bookings
router.get("/my-bookings/:userId", async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId })
      .populate("turfId", "turfName location pricePerHour imageUrl")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Error fetching user bookings:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Cancel booking
router.patch("/:id/cancel", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({ msg: "Booking cancelled successfully", booking });
  } catch (err) {
    console.error("Error cancelling booking:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
