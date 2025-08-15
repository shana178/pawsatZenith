const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

// Register User
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});

//  Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ message: "Invalid Password, Please Try Again!!!" });

    req.session.userId = user._id;
    req.session.name = user.name;
    console.log("Session after login:", req.session); // ✅ Debugging session
    
    // ✅ Ensure session is saved before response
    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ message: "Session error" });
      }
      res.json({ message: "Login successful", userId: user._id });
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

//  Check Logged-in User
router.get("/profile", (req, res) => {
  if (!req.session.userId) return res.status(401).json({ message: "Not logged in" });
  res.json({ message: "User authenticated", userId: req.session.userId, name: req.session.name });
});

//  Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});

module.exports = router;