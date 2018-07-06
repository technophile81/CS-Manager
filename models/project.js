const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectPhoto: { 
        type: String, 
        require: false 
    },
    projectDescription: { 
        type: String, 
        required: false 
    },
    projectUrl: { 
        type: String, 
        required: false 
    },
    projectActive: { 
        type: Boolean, 
        required: true 
    },
    projectPercentComplete: { 
        type: Boolean, 
        required: false 
    },
    projectNote: [{
        type: Schema.Types.ObjectId,
        ref: "projectNote"
    }]
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;