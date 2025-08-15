const express = require("express");
const CartItem = require("../models/CartItem.js"); // Cart Model
const StoreItem = require("../models/StoreItem.js"); // Store Model (to get product details)

const router = express.Router();

// ✅ Get all cart items
router.get("/", async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("product"); // Populate product details
    res.json(cartItems);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ msg: "Server error", error });
  }
});

// ✅ Add item to cart
router.post("/", async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    console.log("Received request:", req.body);
    // Check if product exists in the store
    const product = await StoreItem.findById(productId);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    // Check if product is already in the cart
    let cartItem = await CartItem.findOne({ product: productId });

    if (cartItem) {
      // If product is already in cart, increase quantity
      cartItem.quantity += quantity;
    } else {
      // Add new item to cart
      cartItem = new CartItem({ product: productId, quantity });
    }

    await cartItem.save();
    res.status(201).json(cartItem);
    console.log("Item added to cart:", cartItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ msg: "Server error", error });
  }
});

// ✅ Update cart item quantity
router.put("/:id", async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await CartItem.findById(req.params.id);

    if (!cartItem) return res.status(404).json({ msg: "Cart item not found" });

    cartItem.quantity = quantity;
    await cartItem.save();

    res.json(cartItem);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ msg: "Server error", error });
  }
});

// ✅ Remove item from cart
router.delete("/:id", async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);

    if (!cartItem) return res.status(404).json({ msg: "Cart item not found" });

    await cartItem.deleteOne();
    res.json({ msg: "Item removed from cart" });
  } catch (error) {
    console.error("Error deleting item from cart:", error);
    res.status(500).json({ msg: "Server error", error });
  }
});

module.exports = router;
