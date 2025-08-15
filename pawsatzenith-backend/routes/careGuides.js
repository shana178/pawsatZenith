const express = require('express');
const CareGuide = require("../models/CareGuide.js");
const { isAuth, isAdmin } = require("../middlewares/careGuideMiddleware.js");


const router = express.Router();

// Create a new guide (Admin only)
router.post("/", isAuth, isAdmin, async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const newGuide = new CareGuide({ title, content, type });
    await newGuide.save();
    res.status(201).json(newGuide);
  } catch (err) {
    res.status(500).json({ message: "Failed to create guide", error: err.message });
  }
});

// Update an existing guide (Admin only)
router.put("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const updated = await CareGuide.findByIdAndUpdate(
      req.params.id,
      { title, content, type },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Guide not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update guide", error: err.message });
  }
});

// Get all guides (Public)
router.get("/", async (req, res) => {
  try {
    const guides = await CareGuide.find().sort({ createdAt: -1 });
    res.json(guides);
  } catch (err) {
    res.status(500).json({ message: "Error fetching care guides", error: err.message });
  }
});

// Get guide by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const guide = await CareGuide.findById(req.params.id);
    if (!guide) return res.status(404).json({ message: "Guide not found" });
    res.json(guide);
  } catch (err) {
    res.status(500).json({ message: "Error fetching guide", error: err.message });
  }
});

module.exports = router;
