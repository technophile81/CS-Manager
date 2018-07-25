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


async function getMaterialRequirements (projectId) {
    let result = {
        neededToMeetRequirements: {},
        shouldAllocateFromInventory: {},
        totalAvailableInInventory: {},
        totalRequired: {},
    };

    const project = await db.Project.findById(projectId);
    const projectRequirements = await project.getAllMaterialRequirements();
    const availableMaterials = await db.Inventory.getAvailableMaterials(project.userId);

    result.allocatedFromInventory = await db.Inventory.getAllocatedMaterials(projectId);

    // Transform the internal format to something simpler
    for (let materialId of Object.keys(projectRequirements)) {
        result.totalRequired[materialId] = projectRequirements[materialId].quantity;
        result.neededToMeetRequirements[materialId] = projectRequirements[materialId].quantity;
    }

    for (let materialId of Object.keys(result.neededToMeetRequirements)) {
        result.neededToMeetRequirements[materialId] -= (result.allocatedFromInventory[materialId] || 0);
        result.totalAvailableInInventory[materialId] = (availableMaterials[materialId] || 0);

        if (result.totalAvailableInInventory[materialId] > result.neededToMeetRequirements[materialId]) {
            result.shouldAllocateFromInventory[materialId] = result.neededToMeetRequirements[materialId];
        } else {
            result.shouldAllocateFromInventory[materialId] = result.totalAvailableInInventory[materialId];
        }
    }

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

    const currentRequirements = project.getRequirementsByMaterial(materialId);

    const currentAllocation = await db.Inventory.count({
        projectId: projectId,
        materialId: materialId,
    }).exec();

    while (materialQuantity > currentRequirements.quantity) {
        let req = { materialId: materialId }; 
        project.materialRequirements.push(req);

        materialQuantity--;
    }

    while (materialQuantity < currentRequirements.quantity) {
        let reqId = currentRequirements.ids.pop();
        project.materialRequirements.id(reqId).remove();

        materialQuantity++;
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
    getMaterialRequirements,
    replaceMaterialRequirement,
    updateNote,
    updateOne,
};
