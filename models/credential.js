const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const credentialSchema = new Schema({
    credentialSource: { type: String, require: true },
    credentialName: { type: String, required: true },
    credentialSecret: {type: String, required: true }
});

const Credential = mongoose.model("Credential", credentialSchema);

module.exports = Credential;