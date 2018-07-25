let express = require("express");
let db = require("../models");
let controllers = require("../controllers");

let router = express.Router();
let isAuthenticated = require("../utils/isAuthenticated");
let safeHandler = require("../utils/safeHandler");


async function createProjectNote(req, res) {
    // TODO
}


async function deleteProjectNote(req, res) {
    // TODO
}


async function updateProjectNote(req, res) {
    // TODO
}


router.delete("/api/projects/:id/notes/:noteId", isAuthenticated, safeHandler(deleteProjectNote));
router.post("/api/projects/:id/notes", isAuthenticated, safeHandler(createProjectNote));
router.put("/api/projects/:id/notes/:noteId", isAuthenticated, safeHandler(updateProjectNote));


module.exports = router;
