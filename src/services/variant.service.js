const pgConnection = require('../common/pgConnection');

const { CustomError } = require('../utils/moduleError');

const variantQuery = require('../utils/querys/variant.query');

const addVariantService = async (data) => {
    const pgDB = new pgConnection();

    const { name, stock, cost, productId } = data;

    try {
        await pgDB.query('BEGIN');

        const result = await pgDB.selectFunction(variantQuery.addVariant, { name: name, stock: stock, cost: cost, productId: productId });

        if(!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN TRY TO SAVE DATA');

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'addVariantService',
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
    addVariantService
}