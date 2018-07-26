const db = require("../models");

const passport = require("passport");
const passportJwt = require("passport-jwt");

let passportOpts = {
    jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: process.env.JWT_SECRET || "cs-jwt-secret",
};

passport.use(new passportJwt.Strategy(passportOpts, function (jwtPayload, done) {
    db.User.findById(jwtPayload.userId, function (err, user) {
        if (err) {
            return done(err, false);
        }

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));


// This is middleware for restrictng routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
    // Don't do authentication right now
    if (!process.env.JWT_SECRET) {
        req.user = {};
        req.user._id = db.getFakeUserId();
        return next();
    }


    return passport.authenticate('jwt', { session: false })(req, res, next);
};
