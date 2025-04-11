const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// Create Booking
router.post("/", async (req, res) => {
  const { turfId, userId, date, timeSlot } = req.body;

  console.log("Booking received:", { turfId, userId, date, timeSlot });

  if (!turfId || !userId || !date || !timeSlot) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  try {
    const newBooking = new Booking({ turfId, userId, date, timeSlot });
    await newBooking.save();

    console.log("Booking saved:", newBooking);
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("Error saving booking:", err.message);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
