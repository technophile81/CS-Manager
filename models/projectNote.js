const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectNoteSchema = new Schema({
    noteTimeStamp: { 
        type: String, 
        require: false 
    },
    noteText: { 
        type: String, 
        required: false 
    }
});

const ProjectNote = mongoose.model("ProjectNote", projectNoteSchema);

module.exports = ProjectNote;