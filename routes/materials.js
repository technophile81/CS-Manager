let express = require("express");
let db = require("../models");
let controllers = require("../controllers");

let router = express.Router();
let isAuthenticated = require("../utils/isAuthenticated");
let safeHandler = require("../utils/safeHandler");


async function addMaterial(req, res) {
    controllers.Material.createOne(req.body, req.user._id).then((created) => {
        res.status(201).json(created);
    }).catch((err) => {
        if (err.name == 'ValidationError') {
            res.status(422).send(err.message);
        } else {
            throw err;
        }
    });
}


async function deleteMaterial(req, res) {
    let material = await controllers.Material.getOne(req.params.id, req.user._id);
    if (!material) {
        res.status(404).send("");
        return;
    }

    // Only allow users to delete their own materials
    if (String(material.userId) !== String(req.user._id)) {
        res.status(403).send("");
        return;
    }

    material = await controllers.Material.deleteOne(req.params.id);
    res.status(204).send("");
}


async function getMaterial(req, res) {
    let material = await controllers.Material.getOne(req.params.id. req.user._id);
    if (!material) {
        res.status(404).send("");
        return;
    }

    res.json(material);
}


async function getMaterials(req, res) {
    let materials = await controllers.Material.getMany(null, req.user._id);
    res.json(materials);
}


async function updateMaterial(req, res) {
    let material = await controllers.Material.getOne(req.params.id, req.user._id);
    if (!material) {
        res.status(404).send("");
        return;
    }

    // Only allow users to edit their own materials
    if (String(material.userId) !== String(req.user._id)) {
        res.status(403).send("");
        return;
    }

    material = await controllers.Material.updateOne(req.params.id, req.body);
    res.json(material);
}


router.delete("/api/materials/:id", isAuthenticated, safeHandler(deleteMaterial));
router.get("/api/materials/:id", isAuthenticated, safeHandler(getMaterial));
router.get("/api/materials", isAuthenticated, safeHandler(getMaterials));
router.post("/api/materials", isAuthenticated, safeHandler(addMaterial));
router.put("/api/materials/:id", isAuthenticated, safeHandler(updateMaterial));


module.exports = router;
