const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");

// Initialize Express
const app = express();

// Dotenv
require('dotenv').config();

// Port
const PORT = process.env.PORT || 3000;

// Logging
app.use(morgan('dev'));

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Routes
const routes = require("./routes");
routes(app);

// This allows us to serve files out of the client/build folder
app.use(express.static("client/build"));
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build/index.html'), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
 

app.listen(PORT, function () {
    console.log(`API Server now listening on port ${PORT}`);
})
