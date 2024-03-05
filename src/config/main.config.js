'use strict';

const { CustomError } = require('../utils/moduleError');

let param = null;

const loadEnv = (variable, required = false) => {
    param = process.env[variable];
    
    if(!param) {
        if(required) throw new CustomError('ENV VARIABLE IS NOT DEFINED: ' + variable);
        else return null;
    }

    return param;
};

const config = {
    PORT: loadEnv('PORT', true),
    ACCESS_SECRET: loadEnv('ACCESS_SECRET', true),
    
    API_LOCAL: loadEnv('API_LOCAL', true),

    PG_PORT_LOCAL: loadEnv('PG_PORT_LOCAL', true),
    PG_HOST_LOCAL: loadEnv('PG_HOST_LOCAL', true),
    PG_USER_LOCAL: loadEnv('PG_USER_LOCAL', true),
    PG_PASSWORD_LOCAL: loadEnv('PG_PASSWORD_LOCAL', true),
    PG_DB_LOCAL: loadEnv('PG_DB_LOCAL', true),
};

module.exports = config;