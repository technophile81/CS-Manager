const db = require("../models");
const projectController = require("./project");


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
        materials: {},
        projects: {},
    };

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


async function updateBasketQuantity (userId, materialId, quantity) {
    const shopping = await db.Shopping.findOne({
        userId: userId,
        materialId: materialId,
    }).exec();

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

