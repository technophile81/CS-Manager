const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WishlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    materialId: {
        type: Schema.Types.ObjectId,
        ref: 'Material',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
});



const Wishlist = mongoose.model('Wishlist', WishlistSchema);

module.exports = Wishlist;
