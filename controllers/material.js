const db = require("../models");


async function createOne (data, userId) {
    data.userId = userId;
    let result = await db.Material.create(data).exec();
    return result;
}


async function deleteOne (id) {
    if (!id) {
	return undefined;
    }

    let result = await db.Material.remove({ _id: id }).exec();
    return result;
}


async function getOne (id, userId) {
    let query = {
	_id: id,
    };

    if (userId) {
	query.userId = userId;
    }

    let result = await db.Material.find(query).exec();

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
    let sort = { materialHSL : 1 };

    let result = await db.Material.find(query).sort(sort).exec();
    return result;
}


async function updateOne (id, data) {
    delete data.userId;

    let result = await db.Material.update({ _id: id }, { '$set' : data }).exec();
    return result;
}


module.exports = {
    createOne,
    deleteOne,
    getOne,
    getMany,
    updateOne,
};

