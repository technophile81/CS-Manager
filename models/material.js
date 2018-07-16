const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const MaterialSchema = new Schema({
    materialSKU: {
        type: String,
        required: false,
    },
    materialName: {
        type: String,
        required: false,
    },

    materialRed: {
        type: Number,
        required: true,
    },
    materialGreen: {
        type: Number,
        required: true,
    },
    materialBlue: {
        type: Number,
        required: true,
    },
    materialHSL: {
        type: Number,
        required: true,
    },

    materialRepresentation: {
        type: String,
        required: false,
    },

    brandId: {
        type: Schema.Types.ObjectId,
        ref: "Brand",
    },

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});


const Material = mongoose.model("Material", MaterialSchema);

module.exports = Material;
