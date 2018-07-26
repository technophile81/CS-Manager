const mongoose = require('mongoose');

// Initialize Mongoose for models
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/CS-Manager');

module.exports = {
    getFakeUserId: function () {
        return mongoose.Types.ObjectId('000000000000000000000001');
    },
    getInvisibleUserId: function () {
        return mongoose.Types.ObjectId('000000000000000000000002');
    },

    Brand: require('./brand'),
    Credential: require('./credential'),
    Inventory: require('./inventory'),
    Material: require('./material'),
    Project: require('./project'),
    Shopping: require('./shopping'),
    User: require('./user'),
    Wishlist: require('./wishlist'),
};

