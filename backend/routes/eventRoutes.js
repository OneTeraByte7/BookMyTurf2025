const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const authenticateUser = require("../middleware/auth");

// Create New Event (Protected)
router.post("/", authenticateUser, async (req, res) => {
  try {
    const { eventName, eventDate, eventTime, eventDescription, turfName } = req.body;

    if (!eventName || !eventDate || !eventTime || !eventDescription) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    const newEvent = new Event({
      eventName,
      eventDate,
      eventTime,
      eventDescription,
      turfName: turfName || "",
      createdBy: req.user.id,
    });

    await newEvent.save();
    res.status(201).json({ msg: "Event created successfully!", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get Single Event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("createdBy", "name email");

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get User's Events
router.get("/user/:userId", async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.params.userId })
      .sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error("Error fetching user events:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Update Event (Protected)
router.put("/:id", authenticateUser, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Check if user is the creator
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to update this event" });
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json({ msg: "Event updated successfully", event: updatedEvent });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Delete Event (Protected)
router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Check if user is the creator
    if (event.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not authorized to delete this event" });
    }

    await Event.findByIdAndDelete(req.params.id);
    res.json({ msg: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
