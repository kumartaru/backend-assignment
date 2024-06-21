const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Session = require("../models/Session");
const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({ username, password: hashedPassword, email, role });
    await user.save();
    res.status(200).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login a user and create a session
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    const session = new Session({
      user_id: user._id,
      current_organization_id: null,
      login_time: new Date(),
      last_access_time: new Date(),
    });
    await session.save();

    res.json({ token });
  } catch (err) {
    console.log("err :", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
