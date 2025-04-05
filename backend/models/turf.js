const mongoose = require("mongoose");

const turfSchema = new mongoose.Schema({
  turfName: { type: String, required: true },
  location: { type: String, required: true },
  pricePerHour: { type: Number, required: true },
  contactNumber: { type: String, required: true },
  facilities: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Turf", turfSchema);
