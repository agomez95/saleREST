const brandService = require('../services/products/brand.service');

const addBrandController = async (req, res, next) => {
    try {
        const response = await brandService.addBrandService(req.body);

        res.status(response.response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addBrandController
}