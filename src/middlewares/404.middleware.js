const { NotFoundError } = require('../utils/httpError');

const notFoundRouteMiddleware = (req, res, next) => {

    const error = new NotFoundError(404, 'RUTA NO ENCONTRADA', '404');
    next(error);
};

module.exports = notFoundRouteMiddleware;