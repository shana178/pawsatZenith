const mongoose = require("mongoose");

const LostFoundSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["lost", "found"], required: true },
    description: { type: String, required: true },
    lastSeenLocation: { type: String, required: true },
    image: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["open", "resolved"], default: "open" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LostFound", LostFoundSchema);
