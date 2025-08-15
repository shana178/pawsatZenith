const mongoose = require("mongoose");

const CartItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "StoreItem", required: true },
  quantity: { type: Number, required: true, default: 1 }
});

CartItemSchema.pre(/^find/, function (next) {
  this.populate({
    path: "product",
    select: "name price image category"
  });
  next();
});

module.exports = mongoose.model("CartItem", CartItemSchema);
