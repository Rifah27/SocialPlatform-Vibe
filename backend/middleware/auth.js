const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ error: "No token, authorization denied" });
    }

    try {
        // Handle "Bearer <token>" format
        const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET || "fallback_secret");
        req.user = decoded; // Contains { id: user._id }
        next();
    } catch (err) {
        res.status(401).json({ error: "Token is not valid" });
    }
};
