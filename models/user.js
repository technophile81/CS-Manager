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
    Project: [
        {
            type: Schema.Types.ObjectId,
            ref: "Project"
        }
    ],
    Inventory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Inventory"
        }
    ],
    Credential: [
        {
            type: Schema.Types.ObjectId,
            ref: "Credential"
        }
    ],
    Material: [
        {
            type: Schema.Types.ObjectId,
            ref: "Material"
        }
    ],

});

const User = mongoose.model("User", userSchema);

module.exports = User;