const mongoose = require("mongoose");

// Initialize Mongoose for models
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/CS-Manager");

module.exports = {
    Inventory: require('./inventory'),
    Credential: require('./credential'),
    Material: require('./material'),
    Project: require('./project'),
    ProjectNote: require('./projectNote'),
    Shopping: require('./shopping'),
    User: require('./user'),
    Brand: require('./brand')
};

