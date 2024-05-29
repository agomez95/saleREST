const pgConnection = require('../../common/pgConnection');

const { CustomError } = require('../../utils/moduleError');
const moduleErrorHandler = require('../../utils/moduleError');

const { resolveSearchBrandQuery, resolveSearchSubcategoryQuery, resolveSearchProductQuery } = require('../../utils/searchs/specifications');
const { listProductsOneQuery, listProductsTwoQuerys } = require('../../utils/searchs/products')

const searchQuery = require('../../utils/querys/search.query');

const getProductsByBrandService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        let products = [];

        let SPECS;
        
        await pgDB.connect();
        // TYPE OF SPECS GET IT: First we get the type of specifications from db from the brand
        SPECS = await pgDB.selectFunction(searchQuery.search_spectifications_brand, { id: Number(id) }).catch((error) => { moduleErrorHandler.handleError(error); });
        
        // this 'no content' is for specify that BRAND doesn't have any SPECS
        if (SPECS.length === 0) return { response: { status: 204 } }; 

        // RECIVE QUERYS: this function give some querys by SPECS when we can get the 2 kind of searches of specifications
        const reciveQuery = resolveSearchBrandQuery(SPECS);
        let resultProducts = [];
        let resultSpecs = [];
        
        // this 'no content' is for specify that QUERYS doesn't have any results
        if (!reciveQuery) return { response: { status: 204 } };
        
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
            status: 200,
            service: 'getProductsByBrandService',
            count: products.length,
            data: products
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
        SPECS = await pgDB.selectFunction(searchQuery.search_spectifications_subcategory, { id: Number(id) }).catch((error) => { moduleErrorHandler.handleError(error); });

        // this 'no content' is for specify that SUBCATEGORY doesn't have any SPECS
        if (SPECS.length === 0) return { response: { status: 204 } }; 

        // RECIVE QUERYS: this function give some querys by SPECS when we can get the 2 kind of searches of specifications
        const reciveQuery = resolveSearchSubcategoryQuery(SPECS);
        let resultProducts = [];
        let resultSpecs = [];

        // this 'no content' is for specify that QUERYS doesn't have any results
        if (!reciveQuery) return { response: { status: 204 } };

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
            status: 200,
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
        SPECS = await pgDB.selectFunction(searchQuery.search_spectifications_product, { id: Number(id) }).catch((error) => { moduleErrorHandler.handleError(error); });
        
        // this 'no content' is for specify that SUBCATEGORY doesn't have any SPECS
        if (SPECS.length === 0) return { response: { status: 204 } }; 

        // RECIVE QUERYS: this function give some querys by SPECS when we can get the 2 kind of searches of specifications
        const reciveQuery = resolveSearchProductQuery(SPECS);
        let resultProducts = [];
        let resultSpecs = [];

        // this 'no content' is for specify that QUERYS doesn't have any results
        if (!reciveQuery) return { response: { status: 204 } }; 

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
            status: 200,
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