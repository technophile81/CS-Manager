const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

// Initialize Express
const app = express();

// Require models
const db = require("./models");
const MaterialList = require("./models/material");

// Dotenv
require('dotenv').config();

// Port
const PORT = process.env.PORT || 3001;

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/CS-Manager");

// This allows us to serve files out of the client/build folder
app.use(express.static("client/build"));

 app.get("/", (req, res) => {
    res.send("hi");
});

app.get("/materials", (req, res) => {
    console.log(req.data);
    MaterialList.find({}).then(results => res.json(results));
});


 
app.listen(PORT, function () {
    console.log(`API Server now listening on port ${PORT}`);
})
