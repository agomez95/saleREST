const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { HTTP_RESPONSES } = require('../../common/constans');

const { product } = require('../../db/querys.db');

const addProductService = async (data) => {
    const pgDB = new pgConnection();

    const { name, code, subcategoryId, brandId } = data;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(product.add_product, { name: name, code: code, subcategoryId: subcategoryId, brandId: brandId });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: HTTP_RESPONSES.CREATED,
            service: 'addProductService',
            result: result,
        };

        return response;
    } catch (err) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

module.exports = {
    addProductService
}