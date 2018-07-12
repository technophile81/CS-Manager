// Wrap a route handler in a function that will return a 500 if it throws
module.exports = function (handler) {
    return function(req, res, next) {
	handler(req, res, next).catch(error => res.status(500).send(error.message));
    };
};
