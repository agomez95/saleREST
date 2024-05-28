'use strict';

const { 
    CustomError,
    BadRequestError,
    UnauthorizedError,
    ForbiddendError,
    NotFoundError,
    ConflictError,
    InternalServerError,
    ServiceUnavailableError,
    GatewayTimeoutError
} = require('./httpError');

const errorMap = {
    '23505': (error) => new ConflictError(409, 'ERROR: DUPLICATE KEY VALUE', error.code),
    '23503': (error) => new ConflictError(409, 'ERROR: FOREIGN KEY VIOLATION', error.code),
    '42703': (error) => new BadRequestError(400, 'ERROR: UNDEFINED COLUMN', error.code),
    '42P01': (error) => new NotFoundError(404, 'ERROR: UNDEFINED TABLE', error.code),
    '08001': (error) => new ServiceUnavailableError(503, 'ERROR: CONNECTION FAILURE', error.code),
    '53300': (error) => new GatewayTimeoutError(504, 'ERROR: CONNECTION TIMED OUT', error.code),
    '28000': (error) => new InternalServerError(500, 'ERROR: INVALID DATABASE AUTHORIZATION CREDENTIALS', error.code),
    '3D000': (error) => new NotFoundError(404, 'ERROR: ' + error.message.toUpperCase(), error.code),
    '42883': (error) => new ConflictError(409, `ERROR: FUNCTION DOESN'T EXIST`, error.code),
    '08006': (error) => new UnauthorizedError(401, error.message || 'ERROR: AUTHENTICATION ERROR, CREDENTIALS FAILED', error.code),
    '08007': (error) => new InternalServerError(500, 'ERROR: CONNECTION FAILED, ' + error.message.toUpperCase(), error.code),
    '08003': (error) => new ServiceUnavailableError(503, 'ERROR: DATABASE SERVER REFUSE THE CONNECTION', error.code),
    '08000': (error) => new InternalServerError(500, `ERROR: THE BACKEND CAN'T CONNECT TO THE DATABASE SERVER`, error.code),
    'ECONNREFUSED': (error) => new ServiceUnavailableError(503, `ERROR: THE DATABASE SERVER IS NOT WORKING OR HAVE PERMISSIONS ISSUES`, error.code),
    'P0001': (error) => new NotFoundError(409, `ERROR: DATA NOT FOUND`, error.code)
};

class moduleErrorHandler {
    static handleError(error) {
        const createError = errorMap[error.code];

        if (createError) {
            throw createError(error);
        } else {
            throw new CustomError(500, 'ERROR: INTERNAL SERVER ERROR', error.code, error.message);
        }
    };
};

module.exports = moduleErrorHandler;