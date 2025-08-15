const CareGuide = require("../models/CareGuide"); // Use require instead of import

// Create a new guide (admin only)
const createGuide = async (req, res) => {
  try {
    const { title, content, type } = req.body;
    const newGuide = new CareGuide({ title, content, type });
    await newGuide.save();
    res.status(201).json(newGuide);
  } catch (err) {
    res.status(500).json({ message: "Failed to create guide" });
  }
};

// Update existing guide
const updateGuide = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type } = req.body;
    const updated = await CareGuide.findByIdAndUpdate(
      id,
      { title, content, type },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Guide not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update guide" });
  }
};

// Get all guides (public)
const getAllGuides = async (req, res) => {
  try {
    const guides = await CareGuide.find().sort({ createdAt: -1 });
    res.json(guides);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch guides" });
  }
};

// Export the functions as module.exports
module.exports = {
  createGuide,
  updateGuide,
  getAllGuides
};
