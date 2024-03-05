'use strict';

class CustomError extends Error {
    constructor(cause, status = 500) {
        let causeAux;
        let causeMessageAux;

        if (cause instanceof Error) {
        causeMessageAux = cause.message;
        causeAux = cause;
        } else {
        causeMessageAux = cause;
        }

        super(causeMessageAux);
        
        if (causeAux) {
        this.cause = causeAux;
        }

        this.status = status;
        this.name = this.constructor.name;
        this.message = causeMessageAux;
    }
};

class BadRequestError extends CustomError {
    constructor(cause = 'No Content') {
        super(cause, 400);
        this.code = 'BAD_REQUEST_ERROR';
    }
};

class UnauthorizedError extends CustomError {
    constructor(cause = 'Unauthorized') {
        super(cause, 401);
        this.code = 'UNAUTHORIZED_ERROR';
    }
};

class NotFoundError extends CustomError {
    constructor(cause = 'Not Found') {
        super(cause, 404);
        this.code = 'NOT_FOUND_ERROR';
    }
};

class ConflictError extends CustomError {
    constructor(cause = 'Conflict') {
        super(cause, 409);
        this.code = 'CONFLICT_ERROR';
    }
};

module.exports = {
    CustomError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
    ConflictError,
};