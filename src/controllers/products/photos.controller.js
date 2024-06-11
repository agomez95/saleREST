const photoService = require('../../services/products/photo.service');

const uploadPhotoController = async (req, res, next) => {
    try {
        const response = await photoService.uploadPhotoService(req, res);
        res.status(response.status).json(response);
    } catch (err) {
        next(err);
    }
};

const getPhotosByProductController = async (req, res) => {
    try {
        const response = await photoService.getPhotosByProductService();

        res.status(response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    uploadPhotoController,
    getPhotosByProductController
};