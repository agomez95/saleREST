const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { HTTP_RESPONSES } = require('../../common/constans');

const { variant } = require('../../db/querys.db');

/*** AQUI SI AGREGAR SERVICIO PARA SPECIFICATION VALUE */
const addVariantService = async (data) => {
    const pgDB = new pgConnection();

    const { name, stock, cost, productId } = data;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(variant.add_PRO_variant, { name: name, stock: stock, cost: cost, productId: productId });    
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: HTTP_RESPONSES.CREATED,
            service: 'addVariantService',
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
    addVariantService
}