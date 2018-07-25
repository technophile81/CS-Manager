const db = require("../models");


async function getBasket (userId) {
    const shopping = await db.shopping.find({ userId: userId });
    let result = {};

    for (let item of shopping) {
        result[item.materialId] = item.quantity;
    }

    return result;
}


async function getNeeds (userId) {
    // TODO
    return {};
}


async function updateBasketQuantity (userId, materialId, quantity) {
    const shopping = await db.Shopping.findOne({
        userId: userId,
        materialId: materialId,
    });

    if (shopping) {
        if (quantity <= 0) {
            await shopping.remove().exec();
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


module.exports = {
    getBasket,
    getNeeds,
    updateBasketQuantity,
};

