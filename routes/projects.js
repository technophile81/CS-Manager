let express = require("express");
let db = require("../models");
let controllers = require("../controllers");

let router = express.Router();
let isAuthenticated = require("../utils/isAuthenticated");
let safeHandler = require("../utils/safeHandler");


async function checkProject(req, res, next) {
    const project = await controllers.Project.getOne(req.params.id, req.user._id);
    if (!project) {
        return res.status(404).send("");
    }

    // Only allow users to delete their own projects
    if (String(project.userId) !== String(req.user._id)) {
        return res.status(403).send("");
    }

    req.project = project;
    return next();
}


async function createProject(req, res) {
    controllers.Project.createOne(req.body, req.user._id).then((created) => {
        res.status(201).json(created);
    }).catch((err) => {
        if (err.name == 'ValidationError') {
            res.status(422).send(err.message);
        } else {
            throw err;
        }
    });
}


async function deleteProject(req, res) {
    await controllers.Project.deleteOne(req.params.id);
    res.status(204).send("");
}


async function getProject(req, res) {
    res.json(req.project);
}


async function getProjects(req, res) {
    let projects = await controllers.Project.getMany(null, req.user._id);
    res.json(projects);
}


async function updateProject(req, res) {
    const project = await controllers.Project.updateOne(req.params.id, req.body);
    res.json(project);
}


async function allocateProjectMaterials(req, res) {
    let result = await controllers.Project.allocateMaterials(req.params.id, req.body);
    res.json(result);
}


async function getProjectMaterialRequirements(req, res) {
    let result = await controllers.Project.getMaterialRequirements(req.params.id);
    res.json(result);
}


async function replaceProjectMaterialRequirement(req, res) {
    let result = await controllers.Project.replaceMaterialRequirement(req.params.id, req.params.materialId, req.body.quantity);
    res.json(result);
}


async function createProjectNote(req, res) {
    // TODO
}


async function deleteProjectNote(req, res) {
    // TODO
}


async function updateProjectNote(req, res) {
    // TODO
}


router.delete("/api/projects/:id", isAuthenticated, checkProject, safeHandler(deleteProject));
router.get("/api/projects/:id", isAuthenticated, checkProject, safeHandler(getProject));
router.get("/api/projects", isAuthenticated, safeHandler(getProjects));
router.post("/api/projects", isAuthenticated, safeHandler(createProject));
router.put("/api/projects/:id", isAuthenticated, checkProject, safeHandler(updateProject));

router.get("/api/projects/:id/materials", isAuthenticated, checkProject, safeHandler(getProjectMaterialRequirements));
router.post("/api/projects/:id/materials", isAuthenticated, checkProject, safeHandler(allocateProjectMaterials));
router.put("/api/projects/:id/materials/:materialId", isAuthenticated, checkProject, safeHandler(replaceProjectMaterialRequirement));

router.delete("/api/projects/:id/notes/:noteId", isAuthenticated, checkProject, safeHandler(deleteProjectNote));
router.post("/api/projects/:id/notes", isAuthenticated, checkProject, safeHandler(createProjectNote));
router.put("/api/projects/:id/notes/:noteId", isAuthenticated, checkProject, safeHandler(updateProjectNote));


module.exports = router;
