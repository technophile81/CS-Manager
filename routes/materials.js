let express = require("express");
let db = require("../models");
let controllers = require("../controllers");

let router = express.Router();
let isAuthenticated = require("../utils/isAuthenticated");
let safeHandler = require("../utils/safeHandler");


async function addMaterial(req, res) {
    let created = await controllers.Material.createOne(req.body, req.user.userId);
    res.status(201).json(created);
}


async function deleteMaterial(req, res) {
    let material = await controllers.Material.getOne(req.params.id, req.user.userId);
    if (!material) {
        res.status(404);
        return;
    }

    // Only allow users to delete their own materials
    if (material.userId !== req.user.userId) {
        res.status(403);
        return;
    }

    material = await controllers.Material.deleteOne(req.params.id);
    res.status(204);
}


async function getMaterial(req, res) {
    let material = await controllers.Material.getOne(req.params.id. req.user.userId);
    if (!material) {
        res.status(404);
        return;
    }

    res.json(material);
}


async function getMaterials(req, res) {
    let materials = await controllers.Material.getMany(null, req.user.userId, req.query.orderBy);
    res.json(materials);
}


async function updateMaterial(req, res) {
    let material = await controllers.Material.getOne(req.params.id, req.user.userId);
    if (!material) {
        res.status(404);
        return;
    }

    // Only allow users to edit their own materials
    if (material.userId !== req.user.userId) {
        res.status(403);
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
