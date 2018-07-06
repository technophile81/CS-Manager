var express = require("express");
var mongoose = require("mongoose");

var db = require("../models");

var router = express.Router();

router.get("/api/materials", (req, res) => {
    db.Material.find({}).sort({
        materialHSL: 1
    }).then(results => res.json(results))
}); 

router.post("/api/materials", (req, res) => {
    db.Material.create(req.body).then(dbMaterialList => {
        res.json(dbMaterialList);
    })
})

module.exports = router;