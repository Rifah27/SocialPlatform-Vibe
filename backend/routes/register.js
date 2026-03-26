const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.post("/register", async (req, res) => {
    const { username, phone, email, password } = req.body;

    if (!username || !phone || !email || !password) {
        return res.status(400).json({ error: "Please enter all fields." });
    }

    try {
        // Check if user exists
        let user = await User.findOne({ $or: [{ username }, { email }, { phone }] });
        if (user) {
            return res.status(400).json({ error: "User already exists with this username, email, or phone." });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        user = new User({
            username,
            phone,
            email,
            password: hashedPassword
        });

        await user.save();

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "10h" });

        res.status(201).json({ message: "Registration successful", token, user: { id: user._id, username: user.username, email: user.email, phone: user.phone } });
    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
