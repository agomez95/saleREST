const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { HTTP_RESPONSES } = require('../../common/constans');

const { specification } = require('../../db/querys.db');

/*** AQUI SI AGREGAR SERVICIO PARA SPECIFICATION VALUE */
const addSpecificationService = async (data) => {
    const pgDB = new pgConnection();

    const { color, size, text, name, information, variantId } = data;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(specification.add, { color: color, size: size, text: text, name: name, information: information, variantId: variantId });    
        } catch (error) {
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: HTTP_RESPONSES.CREATED,
            service: 'addSpecificationService',
            message: 'SUCCES',
            result: result,
        };

        return response;
    } catch(error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

module.exports = {
    addSpecificationService
}