const User = require("../models/user");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/login", async (req, res) => {
    const { username, phone, password } = req.body;

    try {
        const user = await User.findOne({
            $or: [
                { username: username },
                { phone: phone }
            ]
        });

        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        res.json({ message: "Login successful", user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
