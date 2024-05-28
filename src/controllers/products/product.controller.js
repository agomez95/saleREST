const productService = require('../../services/products/product.service');

const addProductController = async (req, res, next) => {
    try {
        const response = await productService.addProductService(req.body);

        res.status(response.response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addProductController
};