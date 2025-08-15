const express = require("express");
const Order = require("../models/Order");
const CartItem = require("../models/CartItem");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const cartItems = await CartItem.find(); // later filter by user

    const total = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const newOrder = new Order({
      user: req.session.userId, // assuming session-based login
      items: cartItems,
      shippingInfo: { name, phone, address },
      total
    });

    await newOrder.save();

    // Optionally: clear cart
    await CartItem.deleteMany();

    res.status(201).json({ msg: "Order placed successfully" });
  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ msg: "Server error", error });
  }
});

module.exports = router;
