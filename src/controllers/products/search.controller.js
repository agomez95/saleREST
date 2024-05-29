const searchService = require('../../services/products/search.service');

const getProductsByBrandController = async (req, res, next) => {
    try {
        const response = await searchService.getProductsByBrandService(req.params);

        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

const getProductsBySubcategoryController = async (req, res, next) => {
    try {
        const response = await searchService.getProductsBySubcategoryService(req.params);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

const getDataByProductController = async (req, res, next) => {
    try {
        const response = await searchService.getDataByProductService(req.params);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getProductsByBrandController,
    getProductsBySubcategoryController,
    getDataByProductController
};