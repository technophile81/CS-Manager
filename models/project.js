const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProjectMaterialRequirementSchema = new Schema({
    materialId: {
        type: Schema.Types.ObjectId,
        ref: 'Material',
        required: true,
    },
});


const ProjectNoteSchema = new Schema({
    text: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});


const ProjectSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    infoUrl: {
        type: String,
        required: false,
    },
    photoUrl: {
        type: String,
        required: false,
    },
    active: {
        type: Boolean,
        required: true,
        default: false,
    },
    percentComplete: {
        type: Number,
        required: true,
        default: 0,
    },
    materialRequirements: [ProjectMaterialRequirementSchema],
    notes: [ProjectNoteSchema],
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});


ProjectSchema.methods.getAllMaterialRequirements = function () {
    let result = {};

    for (let req of this.materialRequirements) {
        let materialId = String(req.materialId);

        if (result[materialId] === undefined) {
            result[materialId] = {
                quantity: 0,
                ids: [],
            };
        }

        result[materialId].quantity++;
        result[materialId].ids.push(req._id);
    }

    return result;
}


ProjectSchema.methods.getRequirementsByMaterial = function (materialId) {
    let result = {
        materialId: materialId,
        quantity: 0,
        ids: [],
    };

    for (let req of this.materialRequirements) {
        if (String(req.materialId) === String(materialId)) {
            result.quantity++;
            result.ids.push(req._id);
        }
    }

    return result;
}


const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
