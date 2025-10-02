const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api", require("./routes/login"));

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
