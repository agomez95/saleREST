const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { HTTP_RESPONSES } = require('../../common/constans');

const { subcategory } = require('../../db/querys.db');

const getSubcategoriesService = async () => {
    const pgDB = new pgConnection();

    let result;

    try {
        await pgDB.connect();

        result = await pgDB.query(subcategory.FN_GET_SUBCATEGORIES).catch((error) => { throw error; });
        
        const count = result.length;

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'getSubcategoriesService',
            count: count,
            result: result
        };

        return response;;
    } catch(error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const getSubcategoryService = async (params) => {
    const pgDB = new pgConnection();

    const id = params.id;

    try {
        await pgDB.connect();

        const result = await pgDB.selectFunction(subcategory.FN_GET_SUBCATEGORY, { id: Number(id) }, true);

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'getSubcategoryService',
            result: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const addSubcategoryService = async (data) => {
    const pgDB = new pgConnection();

    const { name, category_id } = data;

    try {
        await pgDB.connect();

        const result = await pgDB.selectFunction(subcategory.FN_ADD_SUBCATEGORY, { name: name, category_id: category_id });

        const response = {
            status: HTTP_RESPONSES.CREATED,
            service: 'addSubcategoryService',
            result: result,
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const editSubcategoryService = async (params, body) => {
    const pgDB = new pgConnection();

    const id = params.id;

    const { name, category_id } = body;

    try {
        await pgDB.connect();

        let result = await pgDB.selectFunction(subcategory.FN_EDIT_SUBCATEGORY, { id: Number(id), name: name, category_id: category_id });

        const response = {
            status: HTTP_RESPONSES.SUCCESS,
            service: 'editSubcategoryService',
            result: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const activateSubcategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        await pgDB.connect();

        const result = await pgDB.selectFunction(subcategory.FN_ACT_SUBCATEGORY, { id: Number(id) });
        
        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'activateSubcategoryService',
            result: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const deactivateSubcategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        await pgDB.connect();

        const result = await pgDB.selectFunction(subcategory.FN_DEACT_SUBCATEGORY, { id: Number(id) });

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'deactivateSubcategoryService',
            result: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const deleteSubcategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        await pgDB.connect();

        const result = await pgDB.selectFunction(subcategory.FN_DEL_SUBCATEGORY, { id: Number(id) });

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'deleteSubcategoryService',
            result: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

module.exports = {
    getSubcategoriesService,
    getSubcategoryService,
    addSubcategoryService,
    editSubcategoryService,
    activateSubcategoryService,
    deactivateSubcategoryService,
    deleteSubcategoryService
};