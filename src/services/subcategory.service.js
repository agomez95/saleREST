const pgConnection = require('../common/pgConnection');

const { CustomError } = require('../utils/moduleError');

const subcategoryQuery = require('../utils/querys/subcategory.query');

const getSubcategorysService = async () => {
    const pgDB = new pgConnection();

    try {
        const result = await pgDB.query(subcategoryQuery.getSubcategorys);
        const message = 'SUCCES';
        const count = result.length;

        if (!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN GET DATA');

        if (result.length === 0) message = 'NO CONTENT';

        const response = {
            status: 200,
            service: 'getSubcategorysService',
            message: message,
            count: count,
            data: result
        };

        return { response: response };
    } catch(err) {
        throw new CustomError(err);
    } finally {
        pgDB.close();
    }
};

const addSubcategoryService = async (data) => {
    const pgDB = new pgConnection();

    const { name, category_id } = data;

    try {
        await pgDB.query('BEGIN');

        const result = await pgDB.selectFunction(subcategoryQuery.addSubcategory, { name: name, category_id: category_id });

        if(!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN TRY TO SAVE DATA');

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'addSubcategoryService',
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

const editNameSubcategoryService = async (params, body) => {
    const pgDB = new pgConnection();

    const id = params.id;
    const { name } = body;

    try {
        await pgDB.query('BEGIN');

        const result = await pgDB.selectFunction(subcategoryQuery.editNameSubcategory, { id: Number(id), name: name });

        if(!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN TRY TO UPDATE DATA');

        let message = 'SUCCES';

        const count = result.length;

        await pgDB.query('COMMIT');

        if (result.length === 0) message = 'NO CONTENT';

        const response = {
            status: 200,
            service: 'editNameSubcategoryService',
            message: message,
            count: count,
            result: result
        };

        return { response: response }
    } catch (err) {
        throw new CustomError(err);
    } finally {
        pgDB.close();
    }
};

const editCategorySubcategoryService = async (params, body) => {
    const pgDB = new pgConnection();

    const id = params.id;
    const { category_id } = body;

    try {
        await pgDB.query('BEGIN');

        const result = await pgDB.selectFunction(subcategoryQuery.editCategorySubcategory, { id: Number(id), category_id: category_id });

        if(!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN TRY TO UPDATE DATA');

        let message = 'SUCCES';

        const count = result.length;

        await pgDB.query('COMMIT');

        if (result.length === 0) message = 'NO CONTENT';

        const response = {
            status: 200,
            service: 'editCategorySubcategoryService',
            message: message,
            count: count,
            result: result
        };

        return { response: response }
    } catch (err) {
        throw new CustomError(err);
    } finally {
        pgDB.close();
    }
};

const activateSubcategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        await pgDB.query('BEGIN');

        const result = await pgDB.selectFunction(subcategoryQuery.activateSubcategory, { id: Number(id) });

        if(!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN TRY TO UPDATE DATA');

        let message = 'SUCCES';

        const count = result.length;

        await pgDB.query('COMMIT');

        if (result.length === 0) message = 'NO CONTENT';

        const response = {
            status: 200,
            service: 'activateSubcategoryService',
            message: message,
            count: count,
            result: result
        };

        return { response: response }
    } catch (err) {
        throw new CustomError(err);
    } finally {
        pgDB.close();
    }
};

const deactivateSubcategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        await pgDB.query('BEGIN');

        const result = await pgDB.selectFunction(subcategoryQuery.deactivateSubcategory, { id: Number(id) });

        if(!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN TRY TO UPDATE DATA');

        let message = 'SUCCES';

        const count = result.length;

        await pgDB.query('COMMIT');

        if (result.length === 0) message = 'NO CONTENT';

        const response = {
            status: 200,
            service: 'deactivateSubcategoryService',
            message: message,
            count: count,
            result: result
        };

        return { response: response }
    } catch (err) {
        throw new CustomError(err);
    } finally {
        pgDB.close();
    }
};

const deleteSubcategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        await pgDB.query('BEGIN');

        const result = await pgDB.selectFunction(subcategoryQuery.deleteSubcategory, { id: Number(id) });

        if(!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN TRY TO DELETE DATA');

        let message = 'SUCCES';

        const count = result.length;

        await pgDB.query('COMMIT');

        if (result.length === 0) message = 'NO CONTENT';

        const response = {
            status: 200,
            service: 'deleteSubcategoryService',
            message: message,
            count: count,
            result: result
        };

        return { response: response }
    } catch (err) {
        throw new CustomError(err);
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