const specificationService = require('../../services/products/specification.service');

const addSpecificationController = async (req, res, next) => {
    try {
        const response = await specificationService.addSpecificationService(req.body);

        res.status(response.response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    addSpecificationController
};