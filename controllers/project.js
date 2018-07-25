const db = require("../models");


async function allocateMaterials (projectId, changes) {
    const project = await db.Project.findById(projectId);
    const before = await getMaterialRequirements(projectId);

    let realChanges = {};

    for (let materialId of Object.keys(changes)) {
        // only allow materials actually available in inventory
        if (before.totalAvailableInInventory[materialId] === undefined) {
            continue;
        }

        if (changes[materialId] < 0) {
            // only allow release up to the total allocated
            if (-(changes[materialId]) > before.allocatedFromInventory) {
                realChanges[materialId] = -(before.allocatedFromInventory);
            } else {
                realChanges[materialId] = changes[materialId];
            }
        } else if (changes[materialId] > 0) {
            // only allow allocation up to what the project needs and is available
            if (changes[materialId] > before.shouldAllocateFromInventory) {
                realChanges[materialId] = before.shouldAllocateFromInventory;
            } else {
                realChanges[materialId] = changes[materialId];
            }
        }
    }

    for (let materialId of Object.keys(realChanges)) {
        await db.Inventory.changeAllocatedMaterials(project.userId, projectId, materialId, realChanges[materialId]);
    }

    const after = await getMaterialRequirements(projectId);
    return after;
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
    const result = await project.save();

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
        allocatedFromInventory: {},
        neededToMeetRequirements: {},
        shouldAllocateFromInventory: {},
        shouldPurchase: {},
        totalAvailableInInventory: {},
        totalRequired: {},
    };

    const project = await db.Project.findById(projectId);
    if (!project) {
        return result;
    }

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

        if (result.totalAvailableInInventory[materialId] >= result.neededToMeetRequirements[materialId]) {
            result.shouldAllocateFromInventory[materialId] = result.neededToMeetRequirements[materialId];
            result.shouldPurchase[materialId] = 0;
        } else {
            result.shouldAllocateFromInventory[materialId] = result.totalAvailableInInventory[materialId];
            result.shouldPurchase[materialId] = result.neededToMeetRequirements[materialId] - result.totalAvailableInInventory[materialId];
        }

        if (result.allocatedFromInventory[materialId] === undefined) {
            result.allocatedFromInventory[materialId] = 0;
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
    allocateMaterials,
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
