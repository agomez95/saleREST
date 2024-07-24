const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { HTTP_RESPONSES } = require('../../common/constans');

const { category } = require('../../db/querys.db');

const getCategorysService = async () => {
    const pgDB = new pgConnection();

    // let result;

    try {
        await pgDB.connect();

        let result = await pgDB.query(category.FN_GET_CATEOGRYS).catch((error) => { throw error; });

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'getCategorysService',
            data: result
        };

        return response;
    } catch(error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const addCategoryService = async (data) => {
    const pgDB = new pgConnection();

    const { name } = data;

    // let result;

    try {
        await pgDB.connect();

        // await pgDB.query('BEGIN');

        // try {
        //     result = await pgDB.selectFunction(category.add_PRO_category, { name: name });
        // } catch (error) {
        //     await pgDB.query('ROLLBACK');
        //     throw error;
        // }

        // await pgDB.query('COMMIT');

        let result = await pgDB.selectFunction(category.FN_ADD_CATEGORY, { name: name });

        const response = {
            status: HTTP_RESPONSES.CREATED,
            service: 'addCategoryService',
            result: result,
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const editCategoryService = async (params, body) => {
    const pgDB = new pgConnection();

    const id = params.id;

    const { name } = body;

    try {
        await pgDB.connect();

        const result = await pgDB.selectFunction(category.FN_EDIT_CATEGORY, { id: Number(id), name: name });

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'editCategoryService',
            result: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const activateCategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    // let result;

    try {
        await pgDB.connect();

        // await pgDB.query('BEGIN');

        // try {
        //     result = await pgDB.selectFunction(category.activate_PRO_category, { id: Number(id) });
        // } catch (error) {
        //     await pgDB.query('ROLLBACK');
        //     throw error;
        // }

        // const count = result.length;

        // await pgDB.query('COMMIT');

        let result = await pgDB.selectFunction(category.FN_ACT_CATEGORY, { id: Number(id) });

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'activateCategoryService',
            result: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const deactivateCategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    // let result;

    try {
        await pgDB.connect();

        // await pgDB.query('BEGIN');

        // try {
        //     result = await pgDB.selectFunction(category.deactivate_PRO_category, { id: Number(id) });
        // } catch (error) {
        //     await pgDB.query('ROLLBACK');
        //     throw error;
        // }

        // await pgDB.query('COMMIT');
        
        let result = await pgDB.selectFunction(category.FN_DEACT_CATEGORY, { id: Number(id) });

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'deactivateCategoryService',
            result: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const deleteCategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    // let result;

    try {
        await pgDB.connect();

        // await pgDB.query('BEGIN');

        // try {
        //     result = await pgDB.selectFunction(category.deactivate_PRO_category, { id: Number(id) });
        // } catch (error) {
        //     await pgDB.query('ROLLBACK');
        //     throw error;
        // }

        // await pgDB.query('COMMIT');

        let result = await pgDB.selectFunction(category.FN_DEL_CATEGORY, { id: Number(id) });

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'deleteCategoryService',
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
    getCategorysService,
    addCategoryService,
    editCategoryService,
    activateCategoryService,
    deactivateCategoryService,
    deleteCategoryService
}