const mongoose = require("mongoose");

const careGuideSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, required: true }, // e.g., Dog, Cat, Bird
}, { timestamps: true });


module.exports = mongoose.model("CareGuide", careGuideSchema);
