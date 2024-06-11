const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { HTTP_RESPONSES } = require('../../common/constans');

const { brand } = require('../../db/querys.db');

const addBrandService = async (data) => {
    const pgDB = new pgConnection();

    const { name } = data;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(brand.add_PRO_brand, { name: name });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: HTTP_RESPONSES.CREATED,
            service: 'addBrandService',
            result: result,
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

module.exports = {
    addBrandService
}