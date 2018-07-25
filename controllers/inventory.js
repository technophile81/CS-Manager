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
    let query = {
	_id: inventoryId,
    };

    if (userId) {
	query.userId = userId;
    }

    let result = await db.Inventory.find(query).exec();

    if (result.length !== 1) {
	return null;
    }

    return result;
}


async function getMany (unused, userId, orderBy) {
    let query = {};
    if (userId) {
        query = { userId: userId };
    }

    // TODO: handle orderBy
    let sort = {};

    let result = await db.Inventory.find(query).sort(sort).exec();
    return result;
}


module.exports = {
    createOne,
    deleteOne,
    getOne,
    getMany,
};

