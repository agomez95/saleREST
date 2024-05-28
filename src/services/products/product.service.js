const pgConnection = require('../../common/pgConnection');

const moduleErrorHandler = require('../../utils/moduleError');

const productQuery = require('../../utils/querys/product.query');

const addProductService = async (data) => {
    const pgDB = new pgConnection();

    const { name, code, subcategoryId, brandId } = data;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(productQuery.add_product, { name: name, code: code, subcategoryId: subcategoryId, brandId: brandId });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'addProductService',
            result: result,
        };

        return { response: response }
    } catch (err) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

module.exports = {
    addProductService
}