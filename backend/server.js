const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const Message = require("./models/Message");
require("dotenv").config();


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api", require("./routes/login"));
app.use("/api", require("./routes/register"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/posts", require("./routes/posts"));


// Socket.io Connection Logic
io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("join_room", (userId) => {
        socket.join(userId);
        console.log(`User ${userId} joined room`);
    });

    socket.on("send_message", async (data) => {
        const { sender, receiver, text } = data;
        try {
            const newMessage = new Message({ sender, receiver, text });
            await newMessage.save();
            
            io.to(receiver).emit("receive_message", data);
            io.to(sender).emit("receive_message", data);
        } catch (err) {
            console.error("Error saving message:", err);
        }
    });



    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

