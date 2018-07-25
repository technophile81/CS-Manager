const db = require("../models");


async function createOne (data, userId) {
    if (userId) {
        data.userId = userId;
    }

    const material = new db.Material(data);
    const result = await material.save();

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
    if (String(materialId).length != 24) {
        return null;
    }

    let query = {
	_id: materialId,
    };

    if (userId) {
        if (String(userId).length != 24) {
            return null;
        }

	query.userId = userId;
    }

    let result = await db.Material.find(query).exec();

    if (result.length !== 1) {
	return null;
    }

    return result[0];
}


async function getMany (unused, userId) {
    let query = {};
    if (userId) {
	query = { '$or' : [ { userId: null }, { userId: userId } ] };
    }

    let result = await db.Material.find(query).exec();
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

