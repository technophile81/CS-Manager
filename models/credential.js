const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CredentialSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
        required: true,
    },
});


const Credential = mongoose.model('Credential', CredentialSchema);

module.exports = Credential;
