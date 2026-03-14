const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();

// Test endpoint to verify server is receiving data correctly
router.post("/test", (req, res) => {
  console.log("📥 Test endpoint - Request body:", req.body);
  console.log("📥 Content-Type:", req.headers['content-type']);
  res.json({ 
    msg: "Test successful",
    received: req.body,
    contentType: req.headers['content-type']
  });
});

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    console.log("=".repeat(50));
    console.log("📥 RAW REQUEST BODY:", JSON.stringify(req.body, null, 2));
    console.log("📥 Content-Type:", req.headers['content-type']);
    console.log("=".repeat(50));

    const { name, email, password, role } = req.body;

    console.log("📝 Extracted values:", { 
      name: name || "MISSING", 
      email: email || "MISSING", 
      role: role || "not provided",
      passwordExists: !!password,
      passwordLength: password?.length || 0,
      passwordValue: password ? `${password.substring(0, 2)}***` : "MISSING"
    });

    // Validate input
    if (!name || !email || !password) {
      console.log("❌ Missing required fields");
      return res.status(400).json({ 
        msg: "Please enter all fields",
        missing: {
          name: !name,
          email: !email,
          password: !password
        }
      });
    }

    // Validate password length
    if (!password || password.length < 6) {
      console.log("❌ Password too short:", password?.length || 0);
      return res.status(400).json({ 
        msg: "Password must be at least 6 characters",
        currentLength: password?.length || 0,
        required: 6
      });
    }

    // Validate email format
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      console.log("❌ Invalid email format:", email);
      return res.status(400).json({ msg: "Please enter a valid email address" });
    }

    // Check if user already exists
    let user = await User.findOne({ email: email.toLowerCase() });
    if (user) {
      console.log("❌ User already exists:", email);
      return res.status(400).json({ msg: "User already exists with this email" });
    }

    console.log("✅ Validation passed, creating user...");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("✅ Password hashed successfully");

    // Create user
    user = new User({ 
      name: name.trim(), 
      email: email.toLowerCase().trim(), 
      password: hashedPassword, 
      role: role || "user" 
    });
    
    await user.save();
    console.log("✅ User created successfully:", user.email);

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    console.log("✅ JWT token generated");

    res.status(201).json({ 
      msg: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("❌ Signup error:", err);
    
    // Handle MongoDB validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ msg: errors.join(', ') });
    }
    
    // Handle duplicate key error
    if (err.code === 11000) {
      return res.status(400).json({ msg: "User already exists with this email" });
    }
    
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login attempt:", { email, passwordProvided: !!password });

    // Validate input
    if (!email || !password) {
      console.log("Missing fields");
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("User found, comparing passwords...");

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    console.log("Login successful for:", user.email);

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: "7d" }
    );

    res.json({ 
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

// Get Current User (Protected Route)
router.get("/me", async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("Get user error:", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
});

module.exports = router;
