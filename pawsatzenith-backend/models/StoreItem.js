const mongoose = require("mongoose");

const StoreItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  image: { type: String },
  description: { type: String },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("StoreItem", StoreItemSchema);
