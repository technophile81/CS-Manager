const db = require("../models");


async function allocateAllMaterials (id, materialId) {
    // TODO
    // if materialId is not null, only allocate all possible of that material
}


async function allocateOneMaterial (id, materialId) {
    // TODO
}


async function createNote (id, noteData) {
    // TODO
}


async function createOne (data, userId) {
    data.userId = userId;
    let result = await db.Project.create(data).exec();
    return result;
}


async function deleteNote (id, noteId) {
    // TODO
}


async function deleteOne (id) {
    if (!id) {
        return undefined;
    }

    let result = await db.Project.remove({ _id: id }).exec();
    return result;
}


async function getOne (id, userId) {
    let query = {
        _id: id,
    };

    if (userId) {
        query.userId = userId;
    }

    let result = await db.Project.find(query).exec();

    if (result.length !== 1) {
        return null;
    }

    return result;
}


async function getMany (id, userId, orderBy) {
    let query = {};
    if (userId) {
        query = { '$or' : [ { userId: null }, { userId: userId } ] };
    }

    // TODO: handle orderBy
    let sort = {};

    let result = await db.Project.find(query).sort(sort).exec();
    return result;
}


async function releaseAllMaterials (id, materialId) {
    // TODO
    // if materialId is not null, only release all possible of that material
}


async function releaseOneMaterial (id, materialId) {
    // TODO
}


async function replaceMaterialRequirement (id, materialId, materialQuantity) {
    // TODO
    // modify a material's required quantity and automatically fix things to make it work
}


async function updateNote (id, noteId, noteData) {
    // TODO
}


async function updateOne (id, data) {
    delete data.userId;

    let result = await db.Project.update({ _id: id }, { '$set' : data }).exec();
    return result;
}


module.exports = {
    allocateAllMaterials,
    allocateOneMaterial,
    createNote,
    createOne,
    deleteNote,
    deleteOne,
    getOne,
    getMany,
    replaceMaterialRequirement,
    updateNote,
    updateOne,
};
