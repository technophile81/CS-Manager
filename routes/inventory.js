let express = require("express");
let db = require("../models");
let controllers = require("../controllers");

let router = express.Router();
let isAuthenticated = require("../utils/isAuthenticated");
let safeHandler = require("../utils/safeHandler");


async function addInventory(req, res) {
    controllers.Inventory.createOne(req.body, req.user._id).then((created) => {
        res.status(201).json(created);
    }).catch((err) => {
        if (err.name == 'ValidationError') {
            res.status(422).send(err.message);
        } else {
            throw err;
        }
    });
}


async function deleteInventory(req, res) {
    let inventory = await controllers.Inventory.getOne(req.params.id, req.user._id);
    if (!inventory) {
        res.status(404).send("");
        return;
    }

    // Only allow users to delete their own inventory
    if (String(inventory.userId) !== String(req.user._id)) {
        res.status(403).send("");
        return;
    }

    inventory = await controllers.Inventory.deleteOne(req.params.id);
    res.status(204).send("");
}


async function getAllInventory(req, res) {
    let inventoryList = await controllers.Inventory.getMany(null, req.user._id);
    let inventory = {};

    for (let item of inventoryList) {
        inventory[item._id] = item;
    }
    res.json(inventory);
}


async function getInventory(req, res) {
    let inventory = await controllers.Inventory.getOne(req.params.id. req.user._id);
    if (!inventory) {
        res.status(404).send("");
        return;
    }

    res.json(inventory);
}


router.delete("/api/inventory/:id", isAuthenticated, safeHandler(deleteInventory));
router.get("/api/inventory/:id", isAuthenticated, safeHandler(getInventory));
router.get("/api/inventory", isAuthenticated, safeHandler(getAllInventory));
router.post("/api/inventory", isAuthenticated, safeHandler(addInventory));


module.exports = router;
