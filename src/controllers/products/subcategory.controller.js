const subcategoryService = require('../../services/products/subcategory.service');

const getSubcategorysController = async (req, res, next) => {
    try {
        const response = await subcategoryService.getSubcategorysService();

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const addSubcategoryController = async (req, res, next) =>{
    try {
        const response = await subcategoryService.addSubcategoryService(req.body);

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const editNameSubcategoryController = async (req, res, next) =>{
    try {
        const response = await subcategoryService.editNameSubcategoryService(req.params, req.body);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

const editCategorySubcategoryController = async (req, res, next) =>{
    try {
        const response = await subcategoryService.editCategorySubcategoryService(req.params, req.body);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

const activateSubcategoryController = async (req, res, next) =>{
    try {
        const response = await subcategoryService.activateSubcategoryService(req.params);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

const deactivateSubcategoryController = async (req, res, next) =>{
    try {
        const response = await subcategoryService.deactivateSubcategoryService(req.params);
        
        res.status(response.status).json({
            ...response
        });
    } catch(err) {
        next(err);
    }
};

const deleteSubcategoryController = async (req, res, next) =>{
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
    getSubcategorysController,
    addSubcategoryController,
    editNameSubcategoryController,
    editCategorySubcategoryController,
    activateSubcategoryController,
    deactivateSubcategoryController,
    deleteSubcategoryController
};