// models/Holiday.js

import mongoose from "mongoose";

const holidaySchema = new mongoose.Schema({
  date: { type: String, required: true },
  description: { type: String, required: true },
});

export default mongoose.model("Holiday", holidaySchema);
