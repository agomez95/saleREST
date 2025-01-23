const subcategoryService = require('../../services/products/subcategory.service');

const getSubcategoriesController = async (req, res, next) => {
    try {
        const response = await subcategoryService.getSubcategoriesService();

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const getSubcategoryController = async (req, res, next) => {
    try {
        const response = await subcategoryService.getSubcategoryService(req.params);

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const addSubcategoryController = async (req, res, next) => {
    try {
        const response = await subcategoryService.addSubcategoryService(req.body);

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const editSubcategoryController = async (req, res, next) => {
    try {
        const response = await subcategoryService.editSubcategoryService(req.params, req.body);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

const activateSubcategoryController = async (req, res, next) => {
    try {
        const response = await subcategoryService.activateSubcategoryService(req.params);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

const deactivateSubcategoryController = async (req, res, next) => {
    try {
        const response = await subcategoryService.deactivateSubcategoryService(req.params);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

const deleteSubcategoryController = async (req, res, next) => {
    try {
        const response = await subcategoryService.deleteSubcategoryService(req.params);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

module.exports = {
    getSubcategoriesController,
    getSubcategoryController,
    addSubcategoryController,
    editSubcategoryController,
    activateSubcategoryController,
    deactivateSubcategoryController,
    deleteSubcategoryController
};