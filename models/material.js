const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaterialSchema = new Schema({

    materialSKU: { 
        type: String, 
        required: false 
    },
    materialName: { 
        type: String, 
        required: false 
    },
   /* materialPrimaryColor: { 
        type: Boolean
        required: true 
    },
    materialRepresentation: { 
        type: Boolean, 
        required: false 
    },*/
    brandId: [{
        type: Schema.Types.ObjectId,
        ref: "Brand"
    }]
});

const Material = mongoose.model("Material", MaterialSchema);

module.exports = Material;