const mongoose = require("mongoose");
const User = require("./models/user");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const users = [
    {
        username: "aliaaa_s",
        email: "aliasiddiqui2707@gmail.com",
        password: "Incorrect@1"
    },
    {
        username: "jane_smith",
        email: "jane@example.com",
        password: "password456"
    },
    {
        username: "alice_wonder",
        email: "alice@example.com",
        password: "password789"
    }
];
for (let user of users) {
    user.password = bcrypt.hashSync(user.password, 10);
}
async function seedUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        await User.deleteMany({});
        await User.insertMany(users);

        console.log("User data seeded successfully.");
        mongoose.disconnect();
    } catch (err) {
        console.error("Error seeding user data:", err);
        mongoose.disconnect();
    }
}

seedUsers();