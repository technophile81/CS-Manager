const db = require("../models");


async function createOne (data, userId) {
    if (userId) {
        data.userId = userId;
    }

    const material = new db.Material(data);
    const result = material.save();

    return result;
}


async function deleteOne (materialId) {
    if (!materialId) {
	return undefined;
    }

    let result = await db.Material.remove({ _id: materialId }).exec();
    return result;
}


async function getOne (materialId, userId) {
    let query = {
	_id: materialId,
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


async function updateOne (materialId, data) {
    delete data.userId;

    let result = await db.Material.update({ _id: materialId }, { '$set' : data }).exec();
    return result;
}


module.exports = {
    createOne,
    deleteOne,
    getOne,
    getMany,
    updateOne,
};

