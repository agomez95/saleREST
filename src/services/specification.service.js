const pgConnection = require('../common/pgConnection');

const moduleErrorHandler = require('../utils/moduleError');

const specificationQuery = require('../utils/querys/specification.query');

const addSpecificationService = async (data) => {
    const pgDB = new pgConnection();

    const { color, size, text, name, information, variantId } = data;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(specificationQuery.addSpecification, { color: color, size: size, text: text, name: name, information: information, variantId: variantId });    
        } catch (error) {
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'addSpecificationService',
            message: 'SUCCES',
            result: result,
        };

        return { response: response }
    } catch(error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

module.exports = {
    addSpecificationService
}