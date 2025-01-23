'use strict';

const moduleErrorHandler = require('../common/moduleError')

const { Client } = require('pg');
const config = require('../config/env.config');

class Database {
    constructor() {
        this.client = new Client({
            user: config.PG_USER_LOCAL,
            host: config.PG_HOST_LOCAL,
            database: config.PG_DB_LOCAL,
            password: config.PG_PASSWORD_LOCAL,
            port: config.PG_PORT_LOCAL
        });
    };

    async connect() {
        try {
            await this.client.connect();
        } catch (error) {
            throw error;
        }
    }

    async query(query, values) {
        try {
            const result = await this.client.query(query, values);
            return result.rows;
        } catch (error) {
            throw error;
        }
    };

    async selectFunction(functionName, params, get_one) {
        try {
            const propertys = Object.keys(params);
            const variables = [];
            const values = [];

            let query;
            
            for(let property of propertys) {
                variables.push(`$${variables.length + 1}`);
                values.push(params[property]);
            }


            query = `SELECT ${functionName}(${variables});`;

            if(get_one) query = `SELECT * FROM ${functionName}(${variables});`;

            const result = await this.client.query(query, values);
            return result.rows;
        } catch (error) {
            throw error;
        }
    };

    async close() {
        await this.client.end();
    };
};

module.exports = Database;