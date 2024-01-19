const pgConnection = require('../common/pgConnection');

const { CustomError } = require('../utils/moduleError');

const { resolveSearchBrandQuery, resolveSearchSubcategoryQuery, resolveSearchProductQuery } = require('../utils/searchs/specifications');
const { listProductsOneQuery, listProductsTwoQuerys } = require('../utils/searchs/products')

const searchQuery = require('../utils/querys/search.query');

const getProductsByBrandService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        let message = 'SUCCES';
        let products = [];

        // TYPE OF SPECS GET IT
        const SPECS = await pgDB.selectFunction(searchQuery.searchSpecificationsByBrand, { id: Number(id) });

        if (!SPECS || SPECS === undefined) throw new CustomError('SOMETHING WRONG WHEN GET DATA');

        if (SPECS.length === 0) message = 'NO CONTENT'; // MEJORAR ESTO PARA QUE RETORNE 0 Y EL MENSAJE

        // RECIVE QUERYS
        const reciveQuery = resolveSearchBrandQuery(SPECS);
        let resultSpecs = [];

        if (!reciveQuery) message = 'NO CONTENT'; // MEJORAR ESTO PARA QUE RETORNE 0 Y EL MENSAJE

        // EXECUTE QUERYS
        const resultProducts = await pgDB.selectFunction(reciveQuery.firstQuery, { id: Number(id) });
        if (reciveQuery.secondQuery) resultSpecs = await pgDB.selectFunction(reciveQuery.secondQuery, { id: Number(id) });

        // VALIDATE RESULTS
        if (!resultProducts || resultProducts === undefined) throw new CustomError('SOMETHING WRONG WHEN GET DATA');
        if (reciveQuery.secondQuery) if (!resultSpecs || resultSpecs === undefined) throw new CustomError('SOMETHING WRONG WHEN GET DATA');

        if (resultProducts.length === 0) message = 'NO CONTENT'; 
        if (reciveQuery.secondQuery) if (resultSpecs.length === 0) message = 'NO CONTENT';
        
        // MAKE LIST OF PRODUCTS
        if (reciveQuery.secondQuery) {
            products = listProductsTwoQuerys(resultProducts, resultSpecs, SPECS);
        } else {
            products = listProductsOneQuery(resultProducts, SPECS);
        }

        const response = {
            status: 200,
            service: 'getProductsByBrandService',
            message: message,
            count: products.length,
            data: products
        };

        return { response: response }
    } catch (err) {
        throw new CustomError(err);
    } finally {
        pgDB.close();
    }
};

const getProductsBySubcategoryService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        let message = 'SUCCES';
        let products = [];
        
        // TYPE OF SPECS GET IT
        const SPECS = await pgDB.selectFunction(searchQuery.searchSpecificationsBySubcategory, { id: Number(id) });

        if (!SPECS || SPECS === undefined) throw new CustomError('SOMETHING WRONG WHEN GET DATA');

        if (SPECS.length === 0) message = 'NO CONTENT'; // MEJORAR ESTO PARA QUE RETORNE 0 Y EL MENSAJE

        // RECIVE QUERYS
        const reciveQuery = resolveSearchSubcategoryQuery(SPECS);
        let resultSpecs = [];

        if (!reciveQuery) message = 'NO CONTENT'; // MEJORAR ESTO PARA QUE RETORNE 0 Y EL MENSAJE

        // EXECUTE QUERYS
        const resultProducts = await pgDB.selectFunction(reciveQuery.firstQuery, { id: Number(id) });
        if (reciveQuery.secondQuery) resultSpecs = await pgDB.selectFunction(reciveQuery.secondQuery, { id: Number(id) });

        // VALIDATE RESULTS
        if (!resultProducts || resultProducts === undefined) throw new CustomError('SOMETHING WRONG WHEN GET DATA');
        if (reciveQuery.secondQuery) if (!resultSpecs || resultSpecs === undefined) throw new CustomError('SOMETHING WRONG WHEN GET DATA');

        if (resultProducts.length === 0) message = 'NO CONTENT'; 
        if (reciveQuery.secondQuery) if (resultSpecs.length === 0) message = 'NO CONTENT';
        
        // MAKE LIST OF PRODUCTS
        if (reciveQuery.secondQuery) {
            products = listProductsTwoQuerys(resultProducts, resultSpecs, SPECS);
        } else {
            products = listProductsOneQuery(resultProducts, SPECS);
        }

        const response = {
            status: 200,
            service: 'getProductsBySubcategoryService',
            message: message,
            count: products.length,
            result: products
        };

        return { response: response }
    } catch (err) {
        throw new CustomError(err);
    } finally {
        pgDB.close();
    }
};

const getDataByProductService = async (data) => {
    const pgDB = new pgConnection();

    const id = data.id;

    try {
        let message = 'SUCCES';
        let products = [];

        // TYPE OF SPECS GET IT
        const SPECS = await pgDB.selectFunction(searchQuery.searchSpecificationsByProduct, { id: Number(id) });

        if (!SPECS || SPECS === undefined) throw new CustomError('SOMETHING WRONG WHEN GET DATA');

        if (SPECS.length === 0) message = 'NO CONTENT'; // MEJORAR ESTO PARA QUE RETORNE 0 Y EL MENSAJE

        // RECIVE QUERYS
        const reciveQuery = resolveSearchProductQuery(SPECS);
        let resultSpecs = [];

        if (!reciveQuery) message = 'NO CONTENT'; // MEJORAR ESTO PARA QUE RETORNE 0 Y EL MENSAJE

        // EXECUTE QUERYS
        const resultProducts = await pgDB.selectFunction(reciveQuery.firstQuery, { id: Number(id) });
        if (reciveQuery.secondQuery) resultSpecs = await pgDB.selectFunction(reciveQuery.secondQuery, { id: Number(id) });

        // VALIDATE RESULTS
        if (!resultProducts || resultProducts === undefined) throw new CustomError('SOMETHING WRONG WHEN GET DATA');
        if (reciveQuery.secondQuery) if (!resultSpecs || resultSpecs === undefined) throw new CustomError('SOMETHING WRONG WHEN GET DATA');

        if (resultProducts.length === 0) message = 'NO CONTENT'; 
        if (reciveQuery.secondQuery) if (resultSpecs.length === 0) message = 'NO CONTENT';
        
        // MAKE LIST OF PRODUCTS
        if (reciveQuery.secondQuery) {
            products = listProductsTwoQuerys(resultProducts, resultSpecs, SPECS);
        } else {
            products = listProductsOneQuery(resultProducts, SPECS);
        }

        const response = {
            status: 200,
            service: 'getDataByProductService',
            message: message,
            count: products.length,
            result: products
        };

        return { response: response }
    } catch (err) {
        throw new CustomError(err);
    } finally {
        pgDB.close();
    }
};

module.exports = {
    getProductsByBrandService,
    getProductsBySubcategoryService,
    getDataByProductService
};