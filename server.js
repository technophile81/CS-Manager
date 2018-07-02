const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/CS-Manager");

// This allows us to serve files out of the client/build folder
app.use(express.static("client/build"));

app.get("/", (req, res) => {
    res.send("hi");
});

app.listen(PORT, function () {
    console.log(`API Server now listening on port ${PORT}`);
})
