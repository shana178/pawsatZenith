const express = require("express");
const StoreItem = require("../models/StoreItem.js");

const router = express.Router();

// Get all store items
router.get("/", async (req, res) => {
  try {
    const items = await StoreItem.find();
    res.json(items);
  } catch (error) {
    console.error("Error fetching store items:", error);
    res.status(500).json({ msg: "Server error", error });
  }
});

// Add new store item
router.post("/", async (req, res) => {
  try {
    console.log("Received Data:", req.body); // Debugging log

    if (!req.body.name || !req.body.price || !req.body.category) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    const item = new StoreItem(req.body);
    await item.save();
    res.status(201).json(item);
  } catch (error) {
    console.error("Error saving item:", error);
    res.status(500).json({ msg: "Server error", error });
  }
});

// Get a single store item by ID
router.get("/:id", async (req, res) => {
    try {
      const item = await StoreItem.findById(req.params.id);
      if (!item) {
        return res.status(404).json({ msg: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error("Error fetching item by ID:", error);
      res.status(500).json({ msg: "Server error", error });
    }
  });

  // Get store items by vendor
router.get("/vendor/:vendorId", async (req, res) => {
  try {
    const items = await StoreItem.find({ vendor: req.params.vendorId });
    res.json(items);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching vendor items", error });
  }
});

module.exports = router;
