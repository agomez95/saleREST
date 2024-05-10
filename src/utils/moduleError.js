'use strict';

const { CustomError, BadRequestError, UnauthorizedError, ForbiddendError, NotFoundError, ConflictError, InternalServerError, ServiceUnavailableError, GatewayTimeoutError } = require('./httpError');

class moduleErrorHandler {
    static handleError(error) {
        switch(error.code) {
            case '23505':
                throw new ConflictError(409, 'ERROR: DUPLICATE KEY VALUE', error.code);
                break;
            case '23503':
                throw new ConflictError(409, 'ERROR: FOREIGN KEY VIOLATION', error.code);
                break;
            case '42703':
                throw new BadRequestError(400, 'ERROR: UNDEFINED COLUMN', error.code);
                break;
            case '42P01':
                throw new NotFoundError(404, 'ERROR: UNDEFINED TABLE', error.code);
                break;
            case '08001':
                throw new ServiceUnavailableError(503, 'ERROR: CONNECTION FAILURE', error.code);
                break;
            case '53300':
                throw new GatewayTimeoutError(504, 'ERROR: CONNECTION TIMED OUT', error.code);
                break;
            case '28000':
                throw new InternalServerError(500, 'ERROR: INVALID DATABASE AUTHORIZATION CREDENTIALS', error.code);
                break;
            case '3D000':
                throw new NotFoundError(404, 'ERROR: ' + error.message.toUpperCase(), error.code);
                break;
            case '42883':
                throw new NotFoundError(409, `ERROR: FUNCTION DOESN'T EXIST`, error.code);
                break;
            case '08006':
                let message = (error.message) ? error.message : 'ERROR: AUTHENTICATION ERROR, CREDENTIALS FAILED';
                throw new UnauthorizedError(401, message, error.code);
                break;
            case '08007':
                throw new InternalServerError(500, 'ERROR: CONNECTION FAILED, ' + error.message.toUpperCase(), error.code);
                break;
            case '08003':
                throw new ServiceUnavailableError(503, 'ERROR: DATABASE SERVER REFUSE THE CONNECTION', error.code);
                break;
            case '08000':
                throw new InternalServerError(500, `ERROR: THE BACKEND CAN'T CONNECT TO THE DATABASE SERVER`, error.code);
                break;
            case 'ECONNREFUSED':
                throw new ServiceUnavailableError(503, `ERROR: THE DATABASE SERVER IS NOT WORKING OR HAVE PERMISSIONS ISSUES`, error.code);
                break;
            case 'P0001':
                throw new NotFoundError(409, `ERROR: DATA NOT FOUND`, error.code);
                break;
            default:
                throw new CustomError(500, 'ERROR: INTERNAL SERVER ERROR', error.code, error.message);
                break;
        }

        /*if (error.code === '23505') {
            throw new ConflictError(409, 'ERROR: DUPLICATE KEY VALUE', error.code);
        } else if (error.code === '23503') {
            throw new ConflictError(409, 'ERROR: FOREIGN KEY VIOLATION', error.code);
        } else if (error.code === '42703') {
            throw new BadRequestError(400, 'ERROR: UNDEFINED COLUMN', error.code);
        } else if (error.code === '42P01') {
            throw new NotFoundError(404, 'ERROR: UNDEFINED TABLE', error.code);
        } else if (error.code === '08001') {
            throw new ServiceUnavailableError(503, 'ERROR: CONNECTION FAILURE', error.code);
        } else if (error.code === '53300') {
            throw new GatewayTimeoutError(504, 'ERROR: CONNECTION TIMED OUT', error.code);
        } else if (error.code === '28000') {
            throw new InternalServerError(500, 'ERROR: INVALID DATABASE AUTHORIZATION CREDENTIALS', error.code);
        } else if (error.code === '3D000') {
            throw new NotFoundError(404, 'ERROR: ' + error.message.toUpperCase(), error.code);
        } else if (error.code === '42883') {
            throw new NotFoundError(409, `ERROR: FUNCTION DOESN'T EXIST`, error.code);
        } else if (error.code === '08006') {
            let message = (error.message) ? error.message : 'ERROR: AUTHENTICATION ERROR, CREDENTIALS FAILED';
            throw new UnauthorizedError(401, message, error.code);
        } else if (error.code === '08007') {
            throw new InternalServerError(500, 'ERROR: CONNECTION FAILED, ' + error.message.toUpperCase(), error.code);
        } else if (error.code === '08003') {
            throw new ServiceUnavailableError(503, 'ERROR: DATABASE SERVER REFUSE THE CONNECTION', error.code);
        } else if (error.code === '08000') {
            throw new InternalServerError(500, `ERROR: THE BACKEND CAN'T CONNECT TO THE DATABASE SERVER`, error.code);
        } else if (error.code === 'ECONNREFUSED') {
            throw new ServiceUnavailableError(503, `ERROR: THE DATABASE SERVER IS NOT WORKING OR HAVE PERMISSIONS ISSUES`, error.code);
        } else if (error.code === 'P0001') {
            throw new NotFoundError(409, `ERROR: DATA NOT FOUND`, error.code);
        } else {
            throw new CustomError(500, 'ERROR: INTERNAL SERVER ERROR', error.code, error.message);
        }*/
    };
};

module.exports = moduleErrorHandler;