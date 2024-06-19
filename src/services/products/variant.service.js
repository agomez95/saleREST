const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { HTTP_RESPONSES } = require('../../common/constans');

const { variant } = require('../../db/querys.db');
const { InternalServerError } = require('../../errors/httpError');

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

const addVariantSpecificationValueService = async (data) => {
    const pgDB = new pgConnection();

    const { variant_id, specification_id } = data;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(variant.add_PRO_variant_specification_value, { variant_id: Number(variant_id), specification_id: Number(specification_id) });    
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: HTTP_RESPONSES.CREATED,
            service: 'addVariantSpecificationValueService',
            result: result,
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(ç);
    } finally {
        pgDB.close();
    }
};

const deleteVariantService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    let result = 0;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            const resultVariantSpec = await pgDB.selectFunction(variant.delete_PRO_variant_specification_value, { id: Number(id) });
            if(resultVariantSpec[0].delete_PRO_variant_specification_value <= 0) throw new InternalServerError(500, 'CAN NOT DELETE VARIANT SPECIFICATION VALUE');

            const resultVariant = await pgDB.selectFunction(variant.delete_PRO_variant, { id: Number(id) });
            result = resultVariant[0].delete_pro_variant;

        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'deleteVariantService',
            variant_deleted: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

module.exports = {
    addVariantService,
    addVariantSpecificationValueService,
    deleteVariantService
}