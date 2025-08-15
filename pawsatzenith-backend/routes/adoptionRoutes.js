const express = require("express");
const Adoption = require("../models/Adoption");
const Pet = require("../models/Pet");
const { protect } = require("../middlewares/authMiddlewares"); 

const router = express.Router();

// ✅ Submit an adoption request (User)
router.post("/", protect, async (req, res) => {
  try {
    const userId = req.session.userId;
    const { pet, message } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const petExists = await Pet.findById(pet);
    if (!petExists) {
      return res.status(404).json({ message: "Pet not found" });
    }

    const existingRequest = await Adoption.findOne({ user: userId, pet });
    if (existingRequest) {
      return res.status(400).json({ message: "You have already applied for this pet" });
    }

    const adoption = new Adoption({ user: userId, pet, message, status: "pending" });
    await adoption.save();

    res.status(201).json({ message: "Adoption request submitted successfully", adoption });
  } catch (error) {
    console.error("Adoption error:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

// ✅ Get adoption requests for a user
router.get("/user", protect, async (req, res) => {
  try {
    const userId = req.session.userId;
    const userRequests = await Adoption.find({ user: userId })
      .populate("pet", "name images");

    res.json(userRequests);
  } catch (error) {
    console.error("Error fetching user adoption requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get all adoption requests for a shelter's pets
router.get("/shelter", protect, async (req, res) => {
  try {
    const shelterId = req.session.userId;
    const shelterPets = await Pet.find({ shelter: shelterId }).select("_id");

    const requests = await Adoption.find({ pet: { $in: shelterPets } })
      .populate("user", "name email")
      .populate("pet", "name images");

    res.json(requests);
  } catch (error) {
    console.error("Error fetching adoption requests:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Approve or Reject an Adoption Request
router.put("/:id", protect, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const adoption = await Adoption.findById(req.params.id).populate("pet");
    if (!adoption) return res.status(404).json({ message: "Request not found" });

    if (adoption.pet.shelter.toString() !== req.session.userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    adoption.status = status;
    await adoption.save();

    if (status === "approved") {
      await Pet.findByIdAndUpdate(adoption.pet._id, { adoptionStatus: "adopted" });
    }

    res.json({ message: `Adoption request ${status} successfully`, adoption });
  } catch (error) {
    console.error("Error updating adoption request:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
