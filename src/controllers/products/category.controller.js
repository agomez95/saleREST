const categoryService = require('../../services/products/category.service');

const getCategoriesController = async (req, res, next) => {
    try {
        const response = await categoryService.getCategoriesService();

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const getCategoryController = async (req, res, next) => {
    try {
        const response = await categoryService.getCategoryService(req.params);

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const addCategoryController = async (req, res, next) => {
    try {
        const response = await categoryService.addCategoryService(req.body);

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const editCategoryController = async (req, res, next) => {
    try {
        const response = await categoryService.editCategoryService(req.params, req.body);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

const activateCategoryController = async (req, res, next) => {
    try {
        const response = await categoryService.activateCategoryService(req.params);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

const deactivateCategoryController = async (req, res, next) => {
    try {
        const response = await categoryService.deactivateCategoryService(req.params);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

const deleteCategoryController = async (req, res, next) => {
    try {
        const response = await categoryService.deleteCategoryService(req.params);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getCategoriesController,
    getCategoryController,
    addCategoryController,
    editCategoryController,
    activateCategoryController,
    deactivateCategoryController,
    deleteCategoryController
}