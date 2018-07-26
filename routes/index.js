module.exports = function (app) {
    app.use(require('./auth'));
    app.use(require('./inventory'));
    app.use(require('./materials'));
    app.use(require('./projects'));
    app.use(require('./shopping'));
};

