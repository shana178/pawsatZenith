const express = require("express");
const Pet = require("../models/Pet");

const router = express.Router();

// Get all pets
router.get("/", async (req, res) => {
  try {
    const pets = await Pet.find().populate("shelter", "name");
    res.json(pets);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add new pet
router.post("/", async (req, res) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single pet by ID
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id).populate("shelter", "name");
    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }
    res.json(pet);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
