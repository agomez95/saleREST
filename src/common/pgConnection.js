'use strict';

const { CustomError } = require('../utils/moduleError');

const { Client } = require('pg');
const config = require('../config/main.config');

class Database {
    constructor() {
        this.client = new Client({
            user: config.PG_LOCAL_USER,
            host: config.PG_LOCAL_HOST,
            database: config.PG_LOCAL_DB,
            password: config.PG_LOCAL_PASSWORD,
            port: config.PG_LOCAL_PORT
        });
        this.client.connect();
    };

    async query(query, values) {
        try {
            const result = await this.client.query(query, values);
            return result.rows;
        } catch (error) {
            throw CustomError(`SOMETHING IS WRONG WITH THIS QUERY: '${query}':`);
        }
    };

    async selectFunction(functionName, params) {
        try {
            const propertys = Object.keys(params);
            const variables = [];
            const values = [];

            for(let property of propertys) {
                variables.push(`$${variables.length + 1}`);
                values.push(params[property]);
            }

            const query = `SELECT ${functionName}(${variables});`;
            const result = await this.client.query(query, values);
            return result.rows;
        } catch (error) {
            //console.error(`error al llamar a la funcion '${funcName}':`);
            throw CustomError(`SOMETHING IS WRONG WITH THIS FUNCTION: '${functionName}':`);
        }
    };

    async close() {
        await this.client.end();
    };
};

module.exports = Database;