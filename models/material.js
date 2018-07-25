const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MaterialSchema = new Schema({
    sku: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },

    red: {
        type: Number,
        required: true,
    },
    green: {
        type: Number,
        required: true,
    },
    blue: {
        type: Number,
        required: true,
    },

    hue: {
        type: Number,
        required: true,
    },
    saturation: {
        type: Number,
        required: true,
    },
    lightness: {
        type: Number,
        required: true,
    },

    representation: {
        type: String,
        required: false,
    },

    brandId: {
        type: Schema.Types.ObjectId,
        ref: 'Brand',
        required: true,
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});


const Material = mongoose.model('Material', MaterialSchema);

module.exports = Material;
