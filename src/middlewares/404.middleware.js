const { NotFoundError } = require('../errors/httpError');
const { HTTP_RESPONSES } = require('../common/constans');

const notFoundRouteMiddleware = (req, res, next) => {
    const error = new NotFoundError(HTTP_RESPONSES.NOT_FOUND, 'RUTA NO ENCONTRADA', '404');
    next(error);
};

module.exports = notFoundRouteMiddleware;