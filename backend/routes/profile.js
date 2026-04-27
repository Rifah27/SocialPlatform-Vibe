const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   GET api/profile/:username
// @desc    Get profile by username
// @access  Public
router.get("/:username", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   PUT api/profile
// @desc    Update user profile
// @access  Private
router.put("/", auth, async (req, res) => {
    const { bio, avatar, coverPhoto, email, username } = req.body;

    const profileFields = {};
    if (bio !== undefined) profileFields.bio = bio;
    if (avatar !== undefined) profileFields.avatar = avatar;
    if (coverPhoto !== undefined) profileFields.coverPhoto = coverPhoto;
    if (email !== undefined) profileFields.email = email;
    if (username !== undefined) profileFields.username = username;

    try {
        let user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: profileFields },
            { new: true }
        ).select("-password");

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;
