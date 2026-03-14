const mongoose = require("mongoose");

const turfSchema = new mongoose.Schema({
  turfName: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  pricePerHour: { type: Number, required: true, min: 0 },
  contactNumber: { type: String, required: true, trim: true },
  facilities: { type: [String], default: [] },
  description: { type: String, trim: true },
  imageUrl: { type: String },
  availability: {
    type: Boolean,
    default: true,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Turf", turfSchema);
