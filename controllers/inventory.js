const db = require("../models");


async function createOne (data, userId) {
    if (userId) {
        data.userId = userId;
    }

    const inventory = new db.Inventory(data);
    const result = inventory.save();

    return result;
}


async function deleteOne (inventoryId) {
    if (!inventoryId) {
	return undefined;
    }

    let result = await db.Inventory.remove({ _id: inventoryId }).exec();
    return result;
}


async function getOne (inventoryId, userId) {
    if (String(inventoryId).length != 24) {
        return null;
    }

    let query = {
	_id: inventoryId,
    };

    if (userId) {
        if (String(userId).length != 24) {
            return null;
        }

	query.userId = userId;
    }

    let result = await db.Inventory.find(query).exec();

    if (result.length !== 1) {
	return null;
    }

    return result[0];
}


async function getMany (unused, userId) {
    let query = {};
    if (userId) {
        query = { userId: userId };
    }

    let result = await db.Inventory.find(query).exec();
    return result;
}


module.exports = {
    createOne,
    deleteOne,
    getOne,
    getMany,
};

