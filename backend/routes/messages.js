const express = require("express");
const router = express.Router();
const Message = require("../models/Message");
const User = require("../models/user");

// Get all users (to start a chat)
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({}, "username email");
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// Get chat history between two users
router.get("/history/:user1/:user2", async (req, res) => {
    try {
        const { user1, user2 } = req.params;
        const messages = await Message.find({
            $or: [
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 }
            ]
        }).sort({ createdAt: 1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
