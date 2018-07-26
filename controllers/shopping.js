const db = require("../models");
const projectController = require("./project");


async function commitShopping (userId) {
    const basket = await getBasket(userId);
    const wishlist = await getWishlist(userId);

    for (let materialId of Object.keys(basket)) {
        let quantity = basket[materialId];

        for (let i = 0; i < quantity; i++) {
            const inventory = new db.Inventory({
                materialId,
                userId,
            });

            await inventory.save();
        }

        if (wishlist[materialId] !== undefined) {
            await updateWishlistQuantity(userId, materialId, wishlist[materialId] - quantity);
        }
    }

    await db.Shopping.remove({ userId: userId });
    return {};
}


async function getBasket (userId) {
    const shopping = await db.Shopping.find({ userId: userId }).exec();
    let result = {};

    for (let item of shopping) {
        result[item.materialId] = item.quantity;
    }

    return result;
}


async function getNeeds (userId) {
    const projects = await db.Project.find({
        userId: userId,
        active: true,
    }).exec();

    let needs = {
        projects: {},
    };

    needs.wishlist = await getWishlist(userId);
    needs.materials = Object.assign({}, needs.wishlist);

    for (let project of projects) {
        let materialRequirements = await projectController.getMaterialRequirements(project._id);
        let shouldPurchase = materialRequirements.shouldPurchase;
        let reqs = {};

        // filter to only have actual requirements and ignore 0s
        for (let materialId of Object.keys(shouldPurchase)) {
            if (shouldPurchase[materialId] > 0) {
                reqs[materialId] = shouldPurchase[materialId];
            }
        }

        if (Object.keys(reqs).length < 1) {
            continue;
        }

        needs.projects[project._id] = {
            name: project.name,
            materials: reqs,
        };

        for (let materialId of Object.keys(reqs)) {
            needs.materials[materialId] = (needs.materials[materialId] || 0) + reqs[materialId];
        }
    }

    return needs;
}


async function getWishlist (userId) {
    const wishlist = await db.Wishlist.find({ userId: userId }).exec();
    let result = {};

    for (let item of wishlist) {
        result[item.materialId] = item.quantity;
    }

    return result;
}


async function updateBasketQuantity (userId, materialId, quantity) {
    const shopping = await db.Shopping.findOne({
        userId: userId,
        materialId: materialId,
    }).exec();

    if (shopping) {
        if (quantity <= 0) {
            await shopping.remove();
        } else {
            shopping.quantity = quantity;
            const result = await shopping.save();
        }
    } else {
        const shopping = new db.Shopping({
            userId: userId,
            materialId: materialId,
            quantity: quantity,
        });
        await shopping.save();
    }

    let result = await getBasket(userId);
    return result;
}


async function updateWishlistQuantity (userId, materialId, quantity) {
    const wishlist = await db.Wishlist.findOne({
        userId: userId,
        materialId: materialId,
    }).exec();

    if (wishlist) {
        if (quantity <= 0) {
            await wishlist.remove();
        } else {
            wishlist.quantity = quantity;
            const result = await wishlist.save();
        }
    } else {
        const wishlist = new db.Wishlist({
            userId: userId,
            materialId: materialId,
            quantity: quantity,
        });
        await wishlist.save();
    }

    let result = await getWishlist(userId);
    return result;
}


module.exports = {
    commitShopping,
    getBasket,
    getNeeds,
    getWishlist,
    updateBasketQuantity,
    updateWishlistQuantity,
};

