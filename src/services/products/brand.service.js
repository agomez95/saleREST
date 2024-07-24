const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { HTTP_RESPONSES } = require('../../common/constans');

const { brand } = require('../../db/querys.db');

const addBrandService = async (data) => {
    const pgDB = new pgConnection();

    const { name } = data;

    try {
        await pgDB.connect();

        const result = await pgDB.selectFunction(brand.FN_ADD_BRAND, { name: name });

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