import { Schema, model } from "mongoose";

const EventSchema = new Schema({
  turfName: { type: String, required: true },
  eventName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  description: { type: String, required: true },
});

export default model("Event", EventSchema);
