let express = require("express");
let db = require("../models");
let controllers = require("../controllers");

let router = express.Router();
let isAuthenticated = require("../utils/isAuthenticated");
let safeHandler = require("../utils/safeHandler");


async function commitShopping(req, res) {
    await controllers.Shopping.commitShopping(req.user._id);

    getShopping(req, res);
}


async function getShopping(req, res) {
    const basket = await controllers.Shopping.getBasket(req.user._id);
    const needs = await controllers.Shopping.getNeeds(req.user._id);
    const wishlist = await controllers.Shopping.getWishlist(req.user._id);

    const shopping = { basket, needs, wishlist };
    res.json(shopping);
}


async function updateBasketQuantity(req, res) {
    const basket = await controllers.Shopping.updateBasketQuantity(req.user._id, req.params.id, req.body.quantity);
    res.json(basket);
}


async function updateWishlistQuantity(req, res) {
    const wishlist = await controllers.Shopping.updateWishlistQuantity(req.user._id, req.params.id, req.body.quantity);
    res.json(wishlist);
}


router.get("/api/shopping", isAuthenticated, safeHandler(getShopping));
router.post("/api/shopping", isAuthenticated, safeHandler(commitShopping));
router.put("/api/shopping/basket/:id", isAuthenticated, safeHandler(updateBasketQuantity));
router.put("/api/shopping/wishlist/:id", isAuthenticated, safeHandler(updateWishlistQuantity));


module.exports = router;
