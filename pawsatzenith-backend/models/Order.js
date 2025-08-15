const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItem" }],
  shippingInfo: {
    name: String,
    phone: String,
    address: String
  },
  total: Number,
  status: { type: String, default: "Placed" }
}, { timestamps: true });

module.exports = mongoose.model("Order", OrderSchema);
