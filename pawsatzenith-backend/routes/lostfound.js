const express = require("express");
const { protect } = require("../middlewares/authMiddlewares");
const LostFound = require("../models/LostFound");

const router = express.Router();

// Create a lost or found report
router.post("/", protect, async (req, res) => {
  try {
    const { type, description, lastSeenLocation, image } = req.body;
    const newReport = new LostFound({
      type,
      description,
      lastSeenLocation,
      image,
      user: req.user._id,
      status: "open",
    });
    await newReport.save();
    res.status(201).json({ message: "Report created successfully", newReport });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get all lost and found reports
router.get("/", async (req, res) => {
  try {
    const reports = await LostFound.find().populate("user", "name email");
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single report by ID
router.get("/:id", async (req, res) => {
  try {
    const report = await LostFound.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!report) return res.status(404).json({ message: "Report not found" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a report (Only the owner can update)
router.put("/:id", protect, async (req, res) => {
  try {
    const report = await LostFound.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    if (report.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    report.description = req.body.description || report.description;
    report.lastSeenLocation =
      req.body.lastSeenLocation || report.lastSeenLocation;
    report.image = req.body.image || report.image;
    report.status = req.body.status || report.status;

    const updatedReport = await report.save();
    res.json({ message: "Report updated successfully", updatedReport });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a report (Only the owner can delete)
router.delete("/:id", protect, async (req, res) => {
  try {
    const report = await LostFound.findById(req.params.id);
    if (!report) return res.status(404).json({ message: "Report not found" });

    if (report.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await report.deleteOne();
    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
