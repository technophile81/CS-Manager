const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const InventorySchema = new Schema({
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
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
    },
});


const Inventory = mongoose.model("Inventory", InventorySchema);

module.exports = Inventory;
