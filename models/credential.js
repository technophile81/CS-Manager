const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

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
        default: 'local',
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    secret: {
        type: String,
        required: true,
    },
});


CredentialSchema.methods.comparePassword = function (password, cb) {
    if (this.source !== 'local') {
        return cb(null, false);
    }

    bcrypt.compare(password, this.secret, function (err, isMatch) {
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
}


CredentialSchema.pre('save', function(next) {
    if (this.source !== 'local') {
        return next();
    }

    const cred = this;

    if (this.isModified('secret') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(cred.secret, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }

                cred.secret = hash;
                next();
            });
        });
    } else {
        return next();
    }
});


const Credential = mongoose.model('Credential', CredentialSchema);

module.exports = Credential;
