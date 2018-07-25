module.exports = function (app) {
    app.use(require('./inventory'));
    app.use(require('./materials'));
    app.use(require('./projects'));
    app.use(require('./projectMaterials'));
    app.use(require('./projectNotes'));
};

