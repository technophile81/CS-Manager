const db = require("../models");


async function allocateAllMaterials (projectId, materialId) {
    // TODO
    // if materialId is not null, only allocate all possible of that material
}


async function allocateOneMaterial (projectId, materialId) {
    // TODO
}


async function createNote (projectId, noteData) {
    const project = await db.Project.findById(projectId);

    project.projectNotes.push(noteData);

    const result = await project.save();
    return result;
}


async function createOne (data, userId) {
    if (userId) {
        data.userId = userId;
    }

    const project = new db.Project(data);
    const result = project.save();

    return result;
}


async function deleteNote (projectId, noteId) {
    const project = await db.Project.findById(projectId);

    project.projectNotes.id(noteId).remove();

    const result = await project.save();
    return result;
}


async function deleteOne (projectId) {
    if (!projectId) {
        return undefined;
    }

    const result = await db.Project.remove({ _id: projectId }).exec();
    return result;
}


async function getOne (projectId, userId) {
    if (String(projectId).length != 24) {
        return null;
    }

    let query = {
        _id: projectId,
    };

    if (userId) {
        if (String(userId).length != 24) {
            return null;
        }

        query.userId = userId;
    }

    const result = await db.Project.find(query).exec();

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

    const result = await db.Project.find(query).exec();
    return result;
}


async function releaseAllMaterials (projectId, materialId) {
    // TODO
    // if materialId is not null, only release all possible of that material
}


async function releaseOneMaterial (projectId, materialId) {
    // TODO
}


async function replaceMaterialRequirement (projectId, materialId, materialQuantity) {
    const project = await db.Project.findById(projectId);

    let currentRequired = 0;
    let currentRequirements = [];

    for (let req of project.materialRequirements) {
        if (req.materialId === materialId) {
            currentRequired++;
            currentRequirements.push(req._id);
        }
    }

    let currentAllocation = await db.Inventory.countDocuments({
        projectId: projectId,
        materialId: materialId,
    }).exec();

    while (materialQuantity < currentRequired) {
        let req = { materialId: materialId }; 
        project.materialRequirements.push(req);

        materialQuantity++;
    }

    while (materialQuantity > currentRequired) {
        let reqId = currentRequirements.pop();
        project.materialRequirements.id(reqId).remove();

        materialQuantity--;
    }

    // NOTE: this method DOES NOT modify material allocations

    const result = await project.save();
    return result;
}


async function updateNote (projectId, noteId, noteData) {
    const project = await db.Project.findById(projectId);

    const note = project.projectNotes.id(noteId);
    if (!note) {
        return null;
    }

    note.set(noteData);

    const result = await project.save();
    return result;
}


async function updateOne (projectId, data) {
    delete data.userId;

    const result = await db.Project.update({ _id: projectId }, { '$set' : data }).exec();
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
