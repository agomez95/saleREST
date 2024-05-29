const pgConnection = require('../../common/pgConnection');

const moduleErrorHandler = require('../../utils/moduleError');

const subcategoryQuery = require('../../utils/querys/subcategory.query');

const getSubcategorysService = async () => {
    const pgDB = new pgConnection();

    let result;

    try {
        await pgDB.connect();

        result = await pgDB.query(subcategoryQuery.get_PRO_subcategorys).catch((error) => { throw error; });
        
        const count = result.length;

        const response = {
            status: 200,
            service: 'getSubcategorysService',
            count: count,
            data: result
        };

        return response;;
    } catch(error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const addSubcategoryService = async (data) => {
    const pgDB = new pgConnection();

    const { name, category_id } = data;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(subcategoryQuery.add_PRO_subcategory, { name: name, category_id: category_id });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        await pgDB.query('COMMIT');

        const response = {
            status: 201,
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

const editNameSubcategoryService = async (params, body) => {
    const pgDB = new pgConnection();

    const id = params.id;

    const { name } = body;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(subcategoryQuery.edit_PRO_subcategory, { id: Number(id), name: name });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        const count = result.length;

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'editNameSubcategoryService',
            count: count,
            result: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

/*** AQUI CREAR UNA FUNCION NUEVA PARA LA EDICION DE CATEGORIAS DE UNA SUB */
const editCategorySubcategoryService = async (params, body) => {
    const pgDB = new pgConnection();

    const id = params.id;

    const { category_id } = body;

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(subcategoryQuery.ed, { id: Number(id), category_id: category_id });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        const count = result.length;

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'editCategorySubcategoryService',
            count: count,
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

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(subcategoryQuery.activate_PRO_subcategory, { id: Number(id) });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        const count = result.length;

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'activateSubcategoryService',
            count: count,
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

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(subcategoryQuery.deactivate_PRO_subcategory, { id: Number(id) });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        const count = result.length;

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'deactivateSubcategoryService',
            count: count,
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

    let result;

    try {
        await pgDB.connect();

        await pgDB.query('BEGIN');

        try {
            result = await pgDB.selectFunction(subcategoryQuery.delete_PRO_subcategory, { id: Number(id) });
        } catch (error) {
            await pgDB.query('ROLLBACK');
            throw error;
        }

        const count = result.length;

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'deleteSubcategoryService',
            count: count,
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
    getSubcategorysService,
    addSubcategoryService,
    editNameSubcategoryService,
    editCategorySubcategoryService,
    activateSubcategoryService,
    deactivateSubcategoryService,
    deleteSubcategoryService
};