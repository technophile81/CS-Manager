module.exports = function (app) {
    app.use(require('./materials'));
    app.use(require('./projects'));
    app.use(require('./users'));
};

