const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: {
        type: String,
        require: true
    },
    userEmail: {
        type: String,
        required: true
    },
    // Array that stores ObjectIds
    // Ref property links ObjectIds to the models
    // Allows me to populate the User with any associated models
    project: [
        {
            type: Schema.Types.ObjectId,
            ref: "project"
        }
    ],
    inventory: [
        {
            type: Schema.Types.ObjectId,
            ref: "inventory"
        }
    ],
    credential: [
        {
            type: Schema.Types.ObjectId,
            ref: "credential"
        }
    ],

});

const User = mongoose.model("User", userSchema);

module.exports = User;