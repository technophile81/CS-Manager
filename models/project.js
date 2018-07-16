const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ProjectMaterialRequirementSchema = new Schema({
    materialId: {
        type: Schema.Types.ObjectId,
        ref: 'Material',
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


const ProjectNoteSchema = new Schema({
    noteText: {
        type: String,
        required: true,
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


const ProjectSchema = new Schema({
    projectDescription: {
        type: String,
        required: false
    },
    projectInfoUrl: {
        type: String,
        required: false
    },
    projectPhotoUrl: {
        type: String,
        required: false
    },
    projectActive: {
        type: Boolean,
        required: true
    },
    projectPercentComplete: {
        type: Number,
        required: false
    },
    projectMaterialRequirements: [ProjectMaterialRequirementSchema],
    projectNotes: [ProjectNoteSchema],
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});


const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
