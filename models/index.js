const mongoose = require("mongoose");

// Initialize Mongoose for models
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/CS-Manager");

module.exports = {
    getFakeUserId: function () {
        return mongoose.Types.ObjectId('000000000000000000000001');
    },

    Inventory: require('./inventory'),
    Credential: require('./credential'),
    Material: require('./material'),
    Project: require('./project'),
    ProjectNote: require('./projectNote'),
    Shopping: require('./shopping'),
    User: require('./user'),
    Brand: require('./brand')
};

