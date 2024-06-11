'use strict';

class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        Error.captureStackTrace(this, this.constructor);
    };
};

class CustomError extends HttpError {
    constructor(status, message, code, info) {
        super(status, message);
        this.code = code;
        this.type = info;
    }
};

class BadRequestError extends HttpError {
    constructor(status, message, code) {
        super(status, message);
        this.code = code;
        this.type = 'BAD_REQUEST_ERROR';
    }
};

class UnauthorizedError extends HttpError {
    constructor(status, message, code) {
        super(status, message);
        this.code = code;
        this.type = 'UNAUTHORIZED_ERROR';
    }
};

class ForbiddendError extends HttpError {
    constructor(status, message, code) {
        super(status, message);
        this.code = code;
        this.type = 'FORBIDDEN_ERROR';
    }
};

class NotFoundError extends HttpError {
    constructor(status, message, code) {
        super(status, message);
        this.code = code;
        this.type = 'NOT_FOUND_ERROR';
    }
};

class ConflictError extends HttpError {
    constructor(status, message, code) {
        super(status, message);
        this.code = code;
        this.type = 'CONFLICT_ERROR';
    }
};

class InternalServerError extends HttpError {
    constructor(status, message, code) {
        super(status, message);
        this.code = code;
        this.type = 'INTERNAL_SERVER_ERROR';
    }
};

class ServiceUnavailableError extends HttpError {
    constructor(status, message, code) {
        super(status, message);
        this.code = code;
        this.type = 'SERVICE_UNAVIABLE_ERROR';
    }
};

class GatewayTimeoutError extends HttpError {
    constructor(status, message, code) {
        super(status, message);
        this.code = code;
        this.type = 'GATEWAY_TIMEOUT_ERROR';
    }
};

module.exports = {
    HttpError,
    CustomError,
    BadRequestError,
    UnauthorizedError,
    ForbiddendError,
    NotFoundError,
    ConflictError,
    InternalServerError,
    ServiceUnavailableError,
    GatewayTimeoutError
};

