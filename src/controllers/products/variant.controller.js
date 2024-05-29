const variantService = require('../../services/products/variant.service');

const addVariantController = async (req, res, next) => {
    try {
        const response = await variantService.addVariantService(req.body);

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addVariantController
};