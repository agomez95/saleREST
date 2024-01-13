const pgConnection = require('../common/pgConnection');

const { CustomError } = require('../utils/moduleError');

const specificationQuery = require('../utils/querys/specification.query');

const addSpecificationService = async (data) => {
    const pgDB = new pgConnection();

    const { color, size, text, name, information, variantId } = data;

    try {
        await pgDB.query('BEGIN');

        const result = await pgDB.selectFunction(specificationQuery.addSpecification, { color: color, size: size, text: text, name: name, information: information, variantId: variantId });

        if(!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN TRY TO SAVE DATA');

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'addSpecificationService',
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
    addSpecificationService
}