const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const CredentialSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    credentialSource: {
        type: String,
        required: true,
    },
    credentialName: {
        type: String,
        required: true,
    },
    credentialSecret: {
        type: String,
        required: true,
    },
});


const Credential = mongoose.model("Credential", CredentialSchema);

module.exports = Credential;
