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
} = require('../errors/httpError');

const { HTTP_RESPONSES, HTTP_MESSAGES } = require('./constans');

const errorMap = {
    '23505': (error) => new ConflictError(HTTP_RESPONSES.CONFLICT , 'ERROR: DUPLICATE KEY VALUE', error.code),
    '23503': (error) => new ConflictError(HTTP_RESPONSES.CONFLICT, 'ERROR: FOREIGN KEY VIOLATION', error.code),
    '42703': (error) => new BadRequestError(HTTP_RESPONSES.BAD_REQUEST, 'ERROR: UNDEFINED COLUMN', error.code),
    '42P01': (error) => new NotFoundError(HTTP_RESPONSES.NOT_FOUND, 'ERROR: UNDEFINED TABLE', error.code),
    '08001': (error) => new ServiceUnavailableError(HTTP_RESPONSES.SERVICE_UNAVAILABLE, 'ERROR: CONNECTION FAILURE', error.code),
    '53300': (error) => new GatewayTimeoutError(HTTP_RESPONSES.SERVICE_UNAVAILABLE, 'ERROR: CONNECTION TIMED OUT', error.code),
    '28000': (error) => new InternalServerError(HTTP_RESPONSES.INTERNAL_SERVER_ERROR, 'ERROR: INVALID DATABASE AUTHORIZATION CREDENTIALS', error.code),
    '3D000': (error) => new NotFoundError(HTTP_RESPONSES.NOT_FOUND, 'ERROR: ' + error.message.toUpperCase(), error.code),
    '42883': (error) => new ConflictError(HTTP_RESPONSES.CONFLICT, `ERROR: FUNCTION DOESN'T EXIST`, error.code),
    '08006': (error) => new UnauthorizedError(HTTP_RESPONSES.UNAUTHORIZED, error.message || 'ERROR: AUTHENTICATION ERROR, CREDENTIALS FAILED', error.code),
    '08007': (error) => new InternalServerError(HTTP_RESPONSES.INTERNAL_SERVER_ERROR, 'ERROR: CONNECTION FAILED, ' + error.message.toUpperCase(), error.code),
    '08003': (error) => new ServiceUnavailableError(HTTP_RESPONSES.SERVICE_UNAVAILABLE, 'ERROR: DATABASE SERVER REFUSE THE CONNECTION', error.code),
    '08000': (error) => new InternalServerError(HTTP_RESPONSES.INTERNAL_SERVER_ERROR, `ERROR: THE BACKEND CAN'T CONNECT TO THE DATABASE SERVER`, error.code),
    'ECONNREFUSED': (error) => new ServiceUnavailableError(HTTP_RESPONSES.SERVICE_UNAVAILABLE, `ERROR: THE DATABASE SERVER IS NOT WORKING OR HAVE PERMISSIONS ISSUES`, error.code),
    'P0001': (error) => new NotFoundError(HTTP_RESPONSES.NOT_FOUND, `ERROR: DATA NOT FOUND`, error.code)
};

class moduleErrorHandler {
    static handleError(error) {
        const createError = errorMap[error.code];

        if (createError) {
            throw createError(error);
        } else {
            throw new CustomError(
                error.status ? error.status : 500, 
                `ERROR: ${error.message}`, 
                error.code ? error.code : 'NO ERROR CODE', 
                error.status ? HTTP_MESSAGES[error.status] : 'INTERNAL SERVER ERROR'
            );
        }
    };
};

module.exports = moduleErrorHandler;