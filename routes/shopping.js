let express = require("express");
let db = require("../models");
let controllers = require("../controllers");

let router = express.Router();
let isAuthenticated = require("../utils/isAuthenticated");
let safeHandler = require("../utils/safeHandler");


async function getShopping(req, res) {
    const basket = await controllers.Shopping.getBasket(req.user._id);
    const needs = await controllers.Shopping.getNeeds(req.user._id);

    const shopping = { basket, needs };
    res.json(shopping);
}


async function updateBasketQuantity(req, res) {
    const basket = await controllers.Shopping.updateBasketQuantity(req.user._id, req.params.id, req.body.quantity);
    res.json(basket);
}


router.get("/api/shopping", isAuthenticated, safeHandler(getShopping));
router.put("/api/shopping/:id", isAuthenticated, safeHandler(updateBasketQuantity));


module.exports = router;
