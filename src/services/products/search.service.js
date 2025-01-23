const pgConnection = require('../../db/connection.db');

const moduleErrorHandler = require('../../common/moduleError');

const { resolveSearchBrandQuery, resolveSearchSubcategoryQuery, resolveSearchProductQuery } = require('../../validations/specifications');
const { listProductsOneQuery, listProductsTwoQuerys } = require('../../validations/products')

const { HTTP_RESPONSES, ZERO_LENGHT } = require('../../common/constans');

const { search } = require('../../db/querys.db');

const getProductsByBrandService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        let products = [];

        let SPECS;
        
        await pgDB.connect();
        // TYPE OF SPECS GET IT: First we get the type of specifications from db from the brand
        SPECS = await pgDB.selectFunction(search.FN_SEARCH_SPECS_BRAND, { id: Number(id) }).catch((error) => { moduleErrorHandler.handleError(error); });
        
        // this 'no content' is for specify that BRAND doesn't have any SPECS
        if (SPECS.length === ZERO_LENGHT) return { response: { status: HTTP_RESPONSES.NO_CONTENT } }; 

        // RECIVE QUERYS: this function give some querys by SPECS when we can get the 2 kind of searches of specifications
        const reciveQuery = resolveSearchBrandQuery(SPECS);
        let resultProducts = [];
        let resultSpecs = [];
        
        // this 'no content' is for specify that QUERYS doesn't have any results
        if (!reciveQuery) return { response: { status: HTTP_RESPONSES.NO_CONTENT } };
        
        // EXECUTE QUERYS: its time for execute the QUERYS recived and GET the PRODUCTS
        resultProducts = await pgDB.selectFunction(reciveQuery.firstQuery, { id: Number(id) }).catch((error) => { moduleErrorHandler.handleError(error); });
        if (reciveQuery.secondQuery) resultSpecs = await pgDB.selectFunction(reciveQuery.secondQuery, { id: Number(id) }).catch((error) => { moduleErrorHandler.handleError(error); });
        
        // MAKE LIST OF PRODUCTS: Iterating the products get it
        if (reciveQuery.secondQuery) {
            products = listProductsTwoQuerys(resultProducts, resultSpecs, SPECS);
        } else {
            products = listProductsOneQuery(resultProducts, SPECS);
        }

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'getProductsByBrandService',
            count: products.length,
            result: products
        };

        return response;
    } catch (err) {
        moduleErrorHandler.handleError(err);
    } finally {
        pgDB.close();
    }
};

const getProductsBySubcategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        let products = [];

        let SPECS;

        await pgDB.connect();
        
        // TYPE OF SPECS GET IT: First we get the type of specifications from db from the SUBCATEGORY
        SPECS = await pgDB.selectFunction(search.FN_SEARCH_SPECS_SUBCAT, { id: Number(id) }).catch((error) => { moduleErrorHandler.handleError(error); });

        // this 'no content' is for specify that SUBCATEGORY doesn't have any SPECS
        if (SPECS.length === ZERO_LENGHT) return { response: { status: HTTP_RESPONSES.NO_CONTENT } }; 

        // RECIVE QUERYS: this function give some querys by SPECS when we can get the 2 kind of searches of specifications
        const reciveQuery = resolveSearchSubcategoryQuery(SPECS);
        let resultProducts = [];
        let resultSpecs = [];

        // this 'no content' is for specify that QUERYS doesn't have any results
        if (!reciveQuery) return { response: { status: HTTP_RESPONSES.NO_CONTENT } };

        // EXECUTE QUERYS: its time for execute the QUERYS recived and GET the PRODUCTS
        resultProducts = await pgDB.selectFunction(reciveQuery.firstQuery, { id: Number(id) }).catch((error) => { moduleErrorHandler.handleError(error); });
        if (reciveQuery.secondQuery) resultSpecs = await pgDB.selectFunction(reciveQuery.secondQuery, { id: Number(id) }).catch((error) => { moduleErrorHandler.handleError(error); });
        
        // MAKE LIST OF PRODUCTS: Iterating the products get it
        if (reciveQuery.secondQuery) {
            products = listProductsTwoQuerys(resultProducts, resultSpecs, SPECS);
        } else {
            products = listProductsOneQuery(resultProducts, SPECS);
        }

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'getProductsBySubcategoryService',
            count: products.length,
            result: products
        };

        return response;
    } catch (err) {
        moduleErrorHandler.handleError(err);
    } finally {
        pgDB.close();
    }
};

const getDataByProductService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        let products = [];

        let SPECS;

        await pgDB.connect();

        // TYPE OF SPECS GET IT: First we get the type of specifications from db from the PRODUCTS
        SPECS = await pgDB.selectFunction(search.FN_SEARCH_SPECS_PRODUCT, { id: Number(id) }).catch((error) => { moduleErrorHandler.handleError(error); });
        
        // this 'no content' is for specify that SUBCATEGORY doesn't have any SPECS
        if (SPECS.length === ZERO_LENGHT) return { response: { status: HTTP_RESPONSES.NO_CONTENT } }; 

        // RECIVE QUERYS: this function give some querys by SPECS when we can get the 2 kind of searches of specifications
        const reciveQuery = resolveSearchProductQuery(SPECS);
        let resultProducts = [];
        let resultSpecs = [];

        // this 'no content' is for specify that QUERYS doesn't have any results
        if (!reciveQuery) return { response: { status: HTTP_RESPONSES.NO_CONTENT } }; 

        // EXECUTE QUERYS: its time for execute the QUERYS recived and GET the PRODUCTS and SPECIFICATIONS
        resultProducts = await pgDB.selectFunction(reciveQuery.firstQuery, { id: Number(id) }).catch((error) => { moduleErrorHandler.handleError(error); });
        if (reciveQuery.secondQuery) resultSpecs = await pgDB.selectFunction(reciveQuery.secondQuery, { id: Number(id) }).catch((error) => { moduleErrorHandler.handleError(error); });
        
        // MAKE LIST OF PRODUCTS: Iterating the products get it
        if (reciveQuery.secondQuery) {
            products = listProductsTwoQuerys(resultProducts, resultSpecs, SPECS);
        } else {
            products = listProductsOneQuery(resultProducts, SPECS);
        }

        const response = {
            status: HTTP_RESPONSES.ACCEPTED,
            service: 'getDataByProductService',
            count: products.length,
            result: products
        };

        return response;
    } catch (err) {
        moduleErrorHandler.handleError(err);
    } finally {
        pgDB.close();
    }
};

module.exports = {
    getProductsByBrandService,
    getProductsBySubcategoryService,
    getDataByProductService
};