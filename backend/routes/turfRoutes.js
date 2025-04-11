const express = require("express");
const router = express.Router();
const Turf = require("../models/Turf");

// GET all turfs from the "turves" collection
router.get("/", async (req, res) => {
  try {
    const turfs = await Turf.find();
    res.json(turfs);
  } catch (err) {
    console.error("Error fetching turfs:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
