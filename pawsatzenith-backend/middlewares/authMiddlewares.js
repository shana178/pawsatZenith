const User = require("../models/User");

const protect = async (req, res, next) => {
  console.log("Session Data in Middleware:", req.session); // ✅ Debugging session

  try {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const user = await User.findById(req.session.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


module.exports = { protect };
