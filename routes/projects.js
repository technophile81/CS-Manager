var express = require("express");
var mongoose = require("mongoose");

var db = require("../models");

var router = express.Router();

router.get("/api/projects", (req, res) => {
    db.Project.find({}).sort({
        createdAt: 1
    }).then(results => res.json(results))
});

router.post("/api/projects", (req, res) => {
    db.Project.create(req.body).then(dbProjectList => {
        res.json(dbProjectList);
    })
})

module.exports = router;