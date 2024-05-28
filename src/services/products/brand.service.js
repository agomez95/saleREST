const pgConnection = require('../../common/pgConnection');

const moduleErrorHandler = require('../../utils/moduleError');

const brandQuery = require('../../utils/querys/brand.query');

const addBrandService = async (data) => {
    const pgDB = new pgConnection();

    const { name } = data;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(brandQuery.add_PRO_brand, { name: name });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'addBrandService',
            result: result,
        };

        return { response: response }
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

module.exports = {
    addBrandService
}