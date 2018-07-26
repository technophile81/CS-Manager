let express = require("express");
let db = require("../models");
let jwt = require("jsonwebtoken");

let router = express.Router();
let isAuthenticated = require("../utils/isAuthenticated");
let safeHandler = require("../utils/safeHandler");


async function authCheck(req, res) {
    return res.json({ success: true, userId: req.user._id });
}


async function authLogin(req, res) {
    db.Credential.findOne({
        source: 'local',
        name: req.body.email,
    }, function (err, cred) {
        if (err) {
            throw err;
        }

        if (!cred) {
            return res.status(401).json({
                success: false,
                message: "User '" + req.body.email + "' not found.",
            });
        }

        cred.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
                let secret = process.env.JWT_SECRET;
                let token = jwt.sign(JSON.stringify({ userId: cred.userId }), secret);

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "Invalid password for user '" + req.body.email + "'.",
                });
            }
        });
    });
}


async function authRegister(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        return res.json({
            success: false,
            message: 'Please enter a valid name, email, and password.',
        });
    }

    let newUser = new db.User({
        name: req.body.name,
    });

    let user = await user.save();

    let newCred = new db.Credential({
        userId: user._id,
        source: 'local',
        name: req.body.email,
        secret: req.body.password,
    });

    cred.save(function (err) {
        if (err) {
            return res.json({
                success: false,
                message: "Unable to create credentials for user.",
            });
        }

        return res.json({ success: true });
    });
}


if (process.env.JWT_SECRET) {
    router.get("/api/authed", isAuthenticated, safeHandler(authCheck));
    router.post("/api/login", safeHandler(authLogin));
    router.post("/api/register", safeHandler(authRegister));
}


module.exports = router;
