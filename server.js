const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize Express
const app = express();

// Dotenv
require('dotenv').config();

// Port
const PORT = process.env.PORT || 3000;

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/CS-Manager");

// Routes
const routes = require("./routes");
routes(app);

// This allows us to serve files out of the client/build folder
app.use(express.static("client/build"));
 

app.listen(PORT, function () {
    console.log(`API Server now listening on port ${PORT}`);
})
