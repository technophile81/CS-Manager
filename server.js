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

// Controllers

const materialsController = require("./controllers/materials.js");

app.use(materialsController);

app.get("/api/hello", (req, res) => {
    res.send("hi!!!! hello!!!");
});

// This allows us to serve files out of the client/build folder
app.use(express.static("client/build"));


// app.get("/api/materials", (req, res) => {
//     console.log("testing" + req.body);
//     MaterialList.find({}).sort({createdAt: -1}).then(results => res.json(results) )
// }); 

// app.post("/api/materials", (req, res) => {
//     console.log(req.body);
//     MaterialList.create(req.body).then(dbMaterialList => {
//         res.json(dbMaterialList);
//     })
// })
 
app.listen(PORT, function () {
    console.log(`API Server now listening on port ${PORT}`);
})
