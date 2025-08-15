const mongoose = require("mongoose");

const PetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["dog", "cat", "bird", "other"], required: true },
    breed: { type: String },
    age: { type: Number, required: true },
    size: { type: String, enum: ["small", "medium", "large"], required: true },
    shelter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    adoptionStatus: { type: String, enum: ["available", "pending", "adopted"], default: "available" },
    images: [String], // Store image URLs
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pet", PetSchema);
