const pgConnection = require('../common/pgConnection');

const { CustomError } = require('../utils/moduleError');

const categoryQuery = require('../utils/querys/category.query');

const getCategorysService = async () => {
    const pgDB = new pgConnection();

    try {
        const result = await pgDB.query(categoryQuery.getCategorys);
        const message = 'SUCCES';
        const count = result.length;

        if (!result || result === undefined) throw new CustomError('SOMETHING WRONG WHEN GET DATA');

        if (result.length === 0) message = 'NO CONTENT';

        const response = {
            status: 200,
            service: 'getCategorysService',
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

const addCategoryService = async (data) => {
    const pgDB = new pgConnection();

    const { name } = data;

    try {
        await pgDB.query('BEGIN');

        const result = await pgDB.selectFunction(categoryQuery.addCategory, { name: name });

        if(!result || result === undefined) throw new CustomError('ERROR AL GUARDAR LOS DATOS DE CURSOS');

        await pgDB.query('COMMIT');

        const response = {
            status: 200,
            service: 'addCategoryService',
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

const editCategoryService = () => {

};

const activateCategoryService = () => {

};

const deactivateCategoryService = () => {

};

const deleteCategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        await pgDB.query('BEGIN');

        const result = await pgDB.selectFunction(categoryQuery.deleteCategory, { id: Number(id) });

        if(!result || result === undefined) throw new CustomError('ERROR AL GUARDAR LOS DATOS DE CURSOS');

        let message = 'SUCCES';

        const count = result.length;

        await pgDB.query('COMMIT');

        if (result.length === 0) message = 'NO CONTENT';

        const response = {
            status: 200,
            service: 'deleteCategoryService',
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
    getCategorysService,
    addCategoryService,
    editCategoryService,
    activateCategoryService,
    deactivateCategoryService,
    deleteCategoryService
}