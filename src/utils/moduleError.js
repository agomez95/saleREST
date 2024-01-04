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
    }
};

class NotFoundError extends CustomError {
    constructor(cause = 'Not Found') {
        super(cause, 404);
    }
};

class UnauthorizedError extends CustomError {
    constructor(cause = 'Unauthorized') {
        super(cause, 401);
    }
};

module.exports = {
    CustomError,
    NotFoundError,
    UnauthorizedError,
    BadRequestError,
};