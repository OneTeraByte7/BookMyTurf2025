const express = require("express");
const router = express.Router();
const Turf = require("../models/Turf");

// POST: Register Turf
router.post("/register", async (req, res) => {
  try {
    const newTurf = new Turf(req.body);
    await newTurf.save();
    res.status(201).json({ msg: "Turf registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
