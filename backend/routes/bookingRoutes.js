// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const Turf = require("../models/Turf");

// Create Booking without userId
router.post("/", async (req, res) => {
  const { turfId, date, timeSlot } = req.body;

  console.log("Booking received:", { turfId, date, timeSlot });

  if (!turfId || !date || !timeSlot) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  try {
    const turf = await Turf.findById(turfId);
    if (!turf) return res.status(404).json({ msg: "Turf not found" });

    const ratePerHour = turf.ratePerHour || 500; // Fallback rate
    const totalPrice = ratePerHour; // You can expand this if booking multiple slots

    const newBooking = new Booking({
      turfId,
      date,
      timeSlot,
      totalPrice,
    });

    await newBooking.save();

    console.log("Booking saved:", newBooking);
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Error saving booking:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
