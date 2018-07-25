const mongoose = require('mongoose');
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
        ref: 'Project',
    },
});


InventorySchema.statics.changeAllocatedMaterials = async function (userId, projectId, materialId, change) {
    if (change < 0) {
        const inventory = await this.find({
            materialId: materialId,
            projectId: projectId,
        }).exec();

        for (let item of inventory) {
            item.projectId = null;
            await item.save();

            if (++change >= 0) {
                break;
            }
        }
    } else if (change > 0) {
        const inventory = await this.find({
            materialId: materialId,
            projectId: null,
            userId: userId,
        }).exec();

        for (let item of inventory) {
            item.projectId = projectId;;
            await item.save();

            if (--change <= 0) {
                break;
            }
        }
    }
}


InventorySchema.statics.getAllocatedMaterials = async function (projectId) {
    let result = {};

    if (!projectId) {
        return result;
    }

    const inventory = await this.find({
        projectId: projectId,
    }).exec();

    for (let item of inventory) {
        result[item.materialId] = (result[item.materialId] || 0) + 1;
    }

    return result;
}

InventorySchema.statics.getAvailableMaterials = async function (userId) {
    let result = {};

    if (!userId) {
        return result;
    }

    const inventory = await this.find({
        userId: userId,
        projectId: null,
    }).exec();

    for (let item of inventory) {
        result[item.materialId] = (result[item.materialId] || 0) + 1;
    }

    return result;
}


const Inventory = mongoose.model('Inventory', InventorySchema);

module.exports = Inventory;
