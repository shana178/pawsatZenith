const mongoose = require("mongoose");

const AdoptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet", required: true },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    message: { type: String }, // Optional message from adopter
  },
  { timestamps: true }
);

module.exports = mongoose.model("Adoption", AdoptionSchema);
