const pgConnection = require('../common/pgConnection');

const { CustomError } = require('../utils/moduleError');

const productQuery = require('../utils/querys/product.query');

const addProductService = async (data) => {
    const pgDB = new pgConnection();

    const { name, code, subcategoryId, brandId } = data;

    try {
        await pgDB.query('BEGIN');

        const result = await pgDB.selectFunction(productQuery.addProduct, { name: name, code: code, subcategoryId: subcategoryId, brandId: brandId });

        if(!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN TRY TO SAVE DATA');

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'addProductService',
            message: 'SUCCES',
            result: result,
        };

        return { response: response }
    } catch (err) {
        throw new CustomError(err);
    } finally {
        pgDB.close();
    }
};

module.exports = {
    addProductService
}