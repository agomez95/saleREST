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

const { HTTP_RESPONSES, HTTP_MESSAGES, PGSQL_ERRORS } = require('./constans');

// const errorMap = {
//     '23505': (error) => new ConflictError(HTTP_RESPONSES.CONFLICT , 'ERROR: DUPLICATE KEY VALUE', error.code),
//     '23503': (error) => new ConflictError(HTTP_RESPONSES.CONFLICT, 'ERROR: FOREIGN KEY VIOLATION', error.code),
//     '42703': (error) => new BadRequestError(HTTP_RESPONSES.BAD_REQUEST, 'ERROR: UNDEFINED COLUMN', error.code),
//     '42P01': (error) => new NotFoundError(HTTP_RESPONSES.NOT_FOUND, 'ERROR: UNDEFINED TABLE', error.code),
//     '08001': (error) => new ServiceUnavailableError(HTTP_RESPONSES.SERVICE_UNAVAILABLE, 'ERROR: CONNECTION FAILURE', error.code),
//     '53300': (error) => new GatewayTimeoutError(HTTP_RESPONSES.SERVICE_UNAVAILABLE, 'ERROR: CONNECTION TIMED OUT', error.code),
//     '28000': (error) => new InternalServerError(HTTP_RESPONSES.INTERNAL_SERVER_ERROR, 'ERROR: INVALID DATABASE AUTHORIZATION CREDENTIALS', error.code),
//     '3D000': (error) => new NotFoundError(HTTP_RESPONSES.NOT_FOUND, 'ERROR: ' + error.message.toUpperCase(), error.code),
//     '42883': (error) => new ConflictError(HTTP_RESPONSES.CONFLICT, `ERROR: FUNCTION DOESN'T EXIST`, error.code),
//     '08006': (error) => new UnauthorizedError(HTTP_RESPONSES.UNAUTHORIZED, error.message || 'ERROR: AUTHENTICATION ERROR, CREDENTIALS FAILED', error.code),
//     '08007': (error) => new InternalServerError(HTTP_RESPONSES.INTERNAL_SERVER_ERROR, 'ERROR: CONNECTION FAILED, ' + error.message.toUpperCase(), error.code),
//     '08003': (error) => new ServiceUnavailableError(HTTP_RESPONSES.SERVICE_UNAVAILABLE, 'ERROR: DATABASE SERVER REFUSE THE CONNECTION', error.code),
//     '08000': (error) => new InternalServerError(HTTP_RESPONSES.INTERNAL_SERVER_ERROR, `ERROR: THE BACKEND CAN'T CONNECT TO THE DATABASE SERVER`, error.code),
//     'ECONNREFUSED': (error) => new ServiceUnavailableError(HTTP_RESPONSES.SERVICE_UNAVAILABLE, `ERROR: THE DATABASE SERVER IS NOT WORKING OR HAVE PERMISSIONS ISSUES`, error.code),
//     'P0001': (error) => new NotFoundError(HTTP_RESPONSES.NOT_FOUND, `ERROR: DATA NOT FOUND`, error.code)
// };

const errorMap = {
    [PGSQL_ERRORS.UNIQUE_VIOLATION]: (error) => new ConflictError(HTTP_RESPONSES.CONFLICT, 'ERROR: DUPLICATE KEY VALUE', error.code),
    [PGSQL_ERRORS.FOREIGN_KEY_VIOLATION]: (error) => new ConflictError(HTTP_RESPONSES.CONFLICT, 'ERROR: FOREIGN KEY VIOLATION', error.code),
    [PGSQL_ERRORS.UNDEFINED_COLUMN]: (error) => new BadRequestError(HTTP_RESPONSES.BAD_REQUEST, 'ERROR: UNDEFINED COLUMN', error.code),
    [PGSQL_ERRORS.UNDEFINED_TABLE]: (error) => new NotFoundError(HTTP_RESPONSES.NOT_FOUND, 'ERROR: UNDEFINED TABLE', error.code),
    [PGSQL_ERRORS.SQLCLIENT_UNABLE_TO_ESTABLISH_SQLCONNECTION]: (error) => new ServiceUnavailableError(HTTP_RESPONSES.SERVICE_UNAVAILABLE, 'ERROR: CONNECTION FAILURE', error.code),
    [PGSQL_ERRORS.TOO_MANY_CONNECTIONS]: (error) => new GatewayTimeoutError(HTTP_RESPONSES.GATEWAY_TIMEOUT, 'ERROR: CONNECTION TIMED OUT', error.code), // Corregido el código de respuesta
    [PGSQL_ERRORS.INVALID_AUTHORIZATION_SPECIFICATION]: (error) => new InternalServerError(HTTP_RESPONSES.INTERNAL_SERVER_ERROR, 'ERROR: INVALID DATABASE AUTHORIZATION CREDENTIALS', error.code),
    [PGSQL_ERRORS.UNDEFINED_DATABASE]: (error) => new NotFoundError(HTTP_RESPONSES.NOT_FOUND, `ERROR: ${error.message.toUpperCase()}`, error.code),
    [PGSQL_ERRORS.FUNCTION_DOES_NOT_EXIST]: (error) => new ConflictError(HTTP_RESPONSES.CONFLICT, 'ERROR: FUNCTION DOESN\'T EXIST', error.code),
    [PGSQL_ERRORS.AUTHENTICATION_ERROR]: (error) => new UnauthorizedError(HTTP_RESPONSES.UNAUTHORIZED, error.message || 'ERROR: AUTHENTICATION ERROR, CREDENTIALS FAILED', error.code),
    [PGSQL_ERRORS.TRANSACTION_RESOLUTION_UNKNOWN]: (error) => new InternalServerError(HTTP_RESPONSES.INTERNAL_SERVER_ERROR, `ERROR: CONNECTION FAILED, ${error.message.toUpperCase()}`, error.code),
    [PGSQL_ERRORS.DATABASE_SERVER_REFUSE_CONNECTION]: (error) => new ServiceUnavailableError(HTTP_RESPONSES.SERVICE_UNAVAILABLE, 'ERROR: DATABASE SERVER REFUSE THE CONNECTION', error.code),
    [PGSQL_ERRORS.DATABASE_SERVER_NOT_WORKING]: (error) => new ServiceUnavailableError(HTTP_RESPONSES.SERVICE_UNAVAILABLE, 'ERROR: THE DATABASE SERVER IS NOT WORKING OR HAVE PERMISSIONS ISSUES', error.code),
    [PGSQL_ERRORS.RAISE_EXCEPTION]: (error) => new NotFoundError(HTTP_RESPONSES.NOT_FOUND, 'ERROR: DATA NOT FOUND', error.code)
};

class moduleErrorHandler {
    static handleError(error) {
        const createError = errorMap[error.code];

        if (createError) {
            throw createError(error);
        } else {
            throw new CustomError(
                error.status ? error.status : HTTP_RESPONSES.INTERNAL_SERVER_ERROR,
                `ERROR: ${error.message}`, 
                error.code ? error.code : 'NO ERROR CODE', 
                error.status ? HTTP_MESSAGES[error.status] : 'INTERNAL SERVER ERROR'
            );
        }
    };
};

module.exports = moduleErrorHandler;