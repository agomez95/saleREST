const brandService = require('../../services/products/brand.service');

const getBrandsController = async (req, res, next) => {
    try {
        const response = await brandService.getBrandsService();

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const getBrandController = async (req, res, next) => {
    try {
        const response = await brandService.getBrandService(req.params);

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const addBrandController = async (req, res, next) => {
    try {
        const response = await brandService.addBrandService(req.body);

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const editBrandController = async (req, res, next) => {
    try {
        const response = await brandService.editBrandService(req.params, req.body);

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const activateBrandController = async (req, res, next) => {
    try {
        const response = await brandService.activateBrandService(req.params);

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const deactivateBrandController = async (req, res, next) => {
    try {
        const response = await brandService.deactivateBrandService(req.params);

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const deleteBrandController = async (req, res, next) => {
    try {
        const response = await brandService.deleteBrandService(req.params);

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getBrandsController,
    getBrandController,
    addBrandController,
    editBrandController,
    activateBrandController,
    deactivateBrandController,
    deleteBrandController
}