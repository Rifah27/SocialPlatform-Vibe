const User = require("../models/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", async (req, res) => {
    // The frontend sends { identifier, password }
    const { identifier, password } = req.body;

    if (!identifier || !password) {
        return res.status(400).json({ error: "Please enter all fields." });
    }

    try {
        const user = await User.findOne({
            $or: [
                { username: identifier },
                { phone: identifier },
                { email: identifier }
            ]
        });

        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "10h" });

        res.json({ message: "Login successful", token, user: { id: user._id, username: user.username, email: user.email, phone: user.phone } });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
