const pgConnection = require('../common/pgConnection');

const { CustomError } = require('../utils/moduleError');

const brandQuery = require('../utils/querys/brand.query');

const addBrandService = async (data) => {
    const pgDB = new pgConnection();

    const { name } = data;

    try {
        await pgDB.query('BEGIN');

        const result = await pgDB.selectFunction(brandQuery.addBrand, { name: name });

        if(!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN TRY TO SAVE DATA');

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'addBrandService',
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
    addBrandService
}