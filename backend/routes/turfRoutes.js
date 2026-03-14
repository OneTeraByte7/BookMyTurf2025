const express = require("express");
const router = express.Router();
const Turf = require("../models/turf");
const authenticateUser = require("../middleware/auth");

// GET all turfs
router.get("/", async (req, res) => {
  try {
    const { location, minPrice, maxPrice, search } = req.query;
    let query = {};

    // Filter by location
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.pricePerHour = {};
      if (minPrice) query.pricePerHour.$gte = Number(minPrice);
      if (maxPrice) query.pricePerHour.$lte = Number(maxPrice);
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { turfName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const turfs = await Turf.find(query).sort({ createdAt: -1 });
    res.json(turfs);
  } catch (err) {
    console.error("Error fetching turfs:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// GET single turf by ID
router.get("/:id", async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);
    if (!turf) {
      return res.status(404).json({ msg: "Turf not found" });
    }
    res.json(turf);
  } catch (err) {
    console.error("Error fetching turf:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// POST create new turf (admin only)
router.post("/", authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Admin only." });
    }

    const { turfName, location, pricePerHour, contactNumber, facilities, description, imageUrl } = req.body;

    if (!turfName || !location || !pricePerHour || !contactNumber) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    const newTurf = new Turf({
      turfName,
      location,
      pricePerHour,
      contactNumber,
      facilities: Array.isArray(facilities) ? facilities : facilities ? [facilities] : [],
      description,
      imageUrl,
    });

    await newTurf.save();
    res.status(201).json({ msg: "Turf created successfully", turf: newTurf });
  } catch (err) {
    console.error("Error creating turf:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT update turf (admin only)
router.put("/:id", authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Admin only." });
    }

    const turf = await Turf.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!turf) {
      return res.status(404).json({ msg: "Turf not found" });
    }

    res.json({ msg: "Turf updated successfully", turf });
  } catch (err) {
    console.error("Error updating turf:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE turf (admin only)
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied. Admin only." });
    }

    const turf = await Turf.findByIdAndDelete(req.params.id);
    
    if (!turf) {
      return res.status(404).json({ msg: "Turf not found" });
    }

    res.json({ msg: "Turf deleted successfully" });
  } catch (err) {
    console.error("Error deleting turf:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
