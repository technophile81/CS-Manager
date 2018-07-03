const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    materialId: [{
        type: Schema.Types.ObjectId,
        ref: "materialId"
    }],
    projectId: [{
        type: Schema.Types.ObjectId,
        ref: "projectId"
    }]
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;