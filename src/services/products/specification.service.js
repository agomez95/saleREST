const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { HTTP_RESPONSES } = require('../../common/constans');

const { specification } = require('../../db/querys.db');

const addSpecificationService = async (data) => {
    const pgDB = new pgConnection();

    const { specficationConstantId, subcategoryId } = data;

    try {
        await pgDB.connect();

        const result = await pgDB.selectFunction(specification.FN_ADD_SPEC, { specficationConstantId: specficationConstantId, subcategoryId: subcategoryId });    

        const response = {
            status: HTTP_RESPONSES.CREATED,
            service: 'addSpecificationService',
            result: result,
        };

        return response;
    
    } catch(error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const addSpecificationValueService = async (data) => {
    const pgDB = new pgConnection();

    const { value, specificationId } = data;

    try {
        await pgDB.connect();

        const result = await pgDB.selectFunction(specification.FN_ADD_SPEC_VAL, { value: value, specificationId: specificationId });    

        const response = {
            status: HTTP_RESPONSES.CREATED,
            service: 'addSpecificationService',
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
    addSpecificationService,
    addSpecificationValueService
}