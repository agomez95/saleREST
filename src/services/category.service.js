const pgConnection = require('../common/pgConnection');

const moduleErrorHandler = require('../utils/moduleError');

const categoryQuery = require('../utils/querys/category.query');

const getCategorysService = async () => {
    const pgDB = new pgConnection();

    let result;

    try {
        await pgDB.connect();

        result = await pgDB.query(categoryQuery.get_PRO_categorys).catch((error) => { throw error; });

        const count = result.length;

        const response = {
            status: 200,
            service: 'getCategorysService',
            count: count,
            data: result
        };

        return { response: response };
    } catch(err) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const addCategoryService = async (data) => {
    const pgDB = new pgConnection();

    const { name } = data;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(categoryQuery.add_PRO_category, { name: name });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'addCategoryService',
            result: result,
        };

        return { response: response }
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

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(categoryQuery.edit_PRO_category, { id: Number(id), name: name });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        const count = result.length;

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'editCategoryService',
            count: count,
            result: result
        };

        return { response: response }
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const activateCategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(categoryQuery.activate_PRO_category, { id: Number(id) });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        const count = result.length;

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'activateCategoryService',
            count: count,
            result: result
        };

        return { response: response }
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const deactivateCategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(categoryQuery.deactivate_PRO_category, { id: Number(id) });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        const count = result.length;

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'deactivateCategoryService',
            count: count,
            result: result
        };

        return { response: response }
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const deleteCategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(categoryQuery.deactivate_PRO_category, { id: Number(id) });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        const count = result.length;

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'deleteCategoryService',
            count: count,
            result: result
        };

        return { response: response }
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