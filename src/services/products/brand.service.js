const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { HTTP_RESPONSES } = require('../../common/constans');

const { brand } = require('../../db/querys.db');

const getBrandsService = async () => {
    const pgDB = new pgConnection();

    try {
        await pgDB.connect();

        const result = await pgDB.query(brand.FN_GET_BRANDS).catch((error) => { throw error; });

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'getBrandsService',
            result: result
        };

        return response;
    } catch(error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const getBrandService = async (params) => {
    const pgDB = new pgConnection();

    const id = params.id;

    try {
        await pgDB.connect();

        const result = await pgDB.selectFunction(brand.FN_GET_BRAND, { id: Number(id) }, true);

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'getBrandService',
            result: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const addBrandService = async (data) => {
    const pgDB = new pgConnection();

    const { name } = data;

    try {
        await pgDB.connect();

        const result = await pgDB.selectFunction(brand.FN_ADD_BRAND, { name: name });

        const response = {
            status: HTTP_RESPONSES.CREATED,
            service: 'addBrandService',
            result: result,
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const editBrandService = async (params, body) => {
    const pgDB = new pgConnection();

    const id = params.id;

    const { name } = body;

    try {
        await pgDB.connect();

        const result = await pgDB.selectFunction(brand.FN_EDIT_BRAND, { id: Number(id), name: name });

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'editBrandService',
            result: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const activateBrandService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        await pgDB.connect();

        let result = await pgDB.selectFunction(brand.FN_ACT_BRAND, { id: Number(id) });

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'activateBrandService',
            result: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const deactivateBrandService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        await pgDB.connect();
        
        const result = await pgDB.selectFunction(brand.FN_DEACT_BRAND, { id: Number(id) });

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'deactivateBrandService',
            result: result
        };

        return response;
    } catch (error) {
        moduleErrorHandler.handleError(error);
    } finally {
        pgDB.close();
    }
};

const deleteBrandService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        await pgDB.connect();

        let result = await pgDB.selectFunction(brand.FN_DEL_BRAND, { id: Number(id) });

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'deleteBrandService',
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
    getBrandsService,
    getBrandService,
    addBrandService,
    editBrandService,
    activateBrandService,
    deactivateBrandService,
    deleteBrandService
}