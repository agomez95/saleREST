'use strict';

module.exports = {
    HTTP_RESPONSES: {
        SUCCESS: 200,
        CREATED: 201,
        ACCEPTED: 202,
        NO_CONTENT: 204,
        BAD_REQUEST: 400,
        UNAUTHORIZED: 401,
        PAYMENT_REQUIRED: 402,
        FORBIDDEN: 403,
        NOT_FOUND: 404,
        METHOD_NOT_ALLOWED: 405,
        REQUEST_TIMEOUT: 408,
        CONFLICT: 409,
        INTERNAL_SERVER_ERROR: 500,
        NOT_IMPLEMENTED: 501,
        BAD_GATEWAY: 502,
        SERVICE_UNAVAILABLE: 503,
        GATEWAY_TIMEOUT: 504
    },
    HTTP_MESSAGES: {
        200: 'SUCCESS',
        201: 'CREATED',
        202: 'ACCEPTED',
        204: 'NO CONTENT',
        400: 'BAD REQUEST',
        401: 'UNAUTHORIZED',
        402: 'PAYMENT REQUIRED',
        403: 'FORBIDDEN',
        404: 'NOT FOUND',
        405: 'METHOD NOT ALLOWED',
        408: 'REQUEST TIMEOUT',
        409: 'CONFLICT',
        500: 'INTERNAL SERVER ERROR',
        501: 'NOT IMPLEMENTED',
        502: 'BAD GATEWAY',
        503: 'SERVICE UNAVAILABLE',
        504: 'GATEWAY TIMEOUT'
    }
};