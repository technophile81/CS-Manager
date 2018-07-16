const db = require("../models");


async function createOne (data, userId) {
    data.userId = userId;
    let result = await db.Inventory.create(data).exec();
    return result;
}


async function deleteOne (id) {
    if (!id) {
	return undefined;
    }

    let result = await db.Inventory.remove({ _id: id }).exec();
    return result;
}


async function getOne (id, userId) {
    let query = {
	_id: id,
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
	query = { '$or' : [ { userId: null }, { userId: userId } ] };
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

