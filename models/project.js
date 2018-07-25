const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProjectMaterialRequirementSchema = new Schema({
    materialId: {
        type: Schema.Types.ObjectId,
        ref: 'Material',
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
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


const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
