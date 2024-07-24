const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { HTTP_RESPONSES } = require('../../common/constans');

const { product } = require('../../db/querys.db');

const addProductService = async (data) => {
    const pgDB = new pgConnection();

    const { name, code, subcategoryId, brandId } = data;

    try {
        await pgDB.connect();

        const result = await pgDB.selectFunction(product.FN_ADD_PRODUCT, { name: name, code: code, subcategoryId: subcategoryId, brandId: brandId });

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