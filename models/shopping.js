const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ShoppingSchema = new Schema({
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



const Shopping = mongoose.model('Shopping', ShoppingSchema);

module.exports = Shopping;
