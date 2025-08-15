const express = require("express");
const session = require("express-session");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Allow frontend origin
  credentials: true, // Allow cookies
}));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }, // 1-day session expiry
  })
);

// ✅ Debugging Middleware (Check if session is working)
app.use((req, res, next) => {
  console.log("Session Data:", req.session);
  next();
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/lostfound", require("./routes/lostfound"));
app.use("/api/pets", require("./routes/petRoutes"));
app.use("/api/adoptions", require("./routes/adoptionRoutes"));
app.use("/api/store", require("./routes/storeRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/care-guides", require("./routes/careGuides"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
