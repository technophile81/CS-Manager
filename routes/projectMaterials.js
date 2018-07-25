let express = require("express");
let db = require("../models");
let controllers = require("../controllers");

let router = express.Router();
let isAuthenticated = require("../utils/isAuthenticated");
let safeHandler = require("../utils/safeHandler");


async function replaceProjectMaterialRequirement(req, res) {
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

    let result = await controllers.Project.replaceMaterialRequirement(req.params.id, req.params.materialId, req.body.quantity);
    res.json(result);
}


router.put("/api/projects/:id/materials/:materialId", isAuthenticated, safeHandler(replaceProjectMaterialRequirement));


module.exports = router;
