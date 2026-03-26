const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/social-media")
.then(() => {
    console.log("Local MongoDB Connected successfully!");
    process.exit(0);
})
.catch(err => {
    console.error("Local Connection Error:", err.message);
    process.exit(1);
});
