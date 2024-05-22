const pgConnection = require('../common/pgConnection');

const moduleErrorHandler = require('../utils/moduleError');

const variantQuery = require('../utils/querys/variant.query');

/*** AQUI SI AGREGAR SERVICIO PARA SPECIFICATION VALUE */
const addVariantService = async (data) => {
    const pgDB = new pgConnection();

    const { name, stock, cost, productId } = data;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(variantQuery.add_PRO_variant, { name: name, stock: stock, cost: cost, productId: productId });    
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'addVariantService',
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
    addVariantService
}