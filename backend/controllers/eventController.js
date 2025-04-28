const Event = require("../routes/eventRoutes"); // Import Event model

// Create New Event
exports.createEvent = async (req, res) => {
  try {
    const { eventName, eventDate, eventTime, eventDescription } = req.body;

    if (!eventName || !eventDate || !eventTime || !eventDescription) {
      return res.status(400).json({ msg: "Please fill all fields" });
    }

    const newEvent = new Event({
      eventName,
      eventDate,
      eventTime,
      eventDescription,
      createdBy: req.user.id, // req.user.id from auth middleware
    });

    await newEvent.save();
    res.status(201).json({ msg: "Event created successfully!", event: newEvent });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
