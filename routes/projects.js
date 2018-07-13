let express = require("express");
let db = require("../models");
let controllers = require("../controllers");

let router = express.Router();
let isAuthenticated = require("../utils/isAuthenticated");
let safeHandler = require("../utils/safeHandler");


async function createProject(req, res) {
    let created = await controllers.Project.createOne(req.body, req.user.userId);
    res.status(201).json(created);
}


async function deleteProject(req, res) {
    let project = await controllers.Project.getOne(req.params.id, req.user.userId);
    if (!project) {
        res.status(404);
        return;
    }

    // Only allow users to delete their own projects
    if (project.userId !== req.user.userId) {
        res.status(403);
        return;
    }

    project = await controllers.Project.deleteOne(req.params.id);
    res.status(204);
}


async function getProject(req, res) {
    let project = await controllers.Project.getOne(req.params.id. req.user.userId);
    if (!project) {
        res.status(404);
        return;
    }

    res.json(project);
}


async function getProjects(req, res) {
    let projects = await controllers.Project.getMany(null, req.user.userId, req.query.orderBy);
    res.json(projects);
}


async function updateProject(req, res) {
    let project = await controllers.Project.getOne(req.params.id, req.user.userId);
    if (!project) {
        res.status(404);
        return;
    }

    // Only allow users to edit their own projects
    if (project.userId !== req.user.userId) {
        res.status(403);
        return;
    }

    project = await controllers.Project.updateOne(req.params.id, req.body);
    res.json(project);
}


router.delete("/api/projects/:id", isAuthenticated, safeHandler(deleteProject));
router.get("/api/projects/:id", isAuthenticated, safeHandler(getProject));
router.get("/api/projects", isAuthenticated, safeHandler(getProjects));
router.post("/api/projects", isAuthenticated, safeHandler(createProject));
router.put("/api/projects/:id", isAuthenticated, safeHandler(updateProject));


module.exports = router;
