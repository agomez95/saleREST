const photoService = require('../../services/products/photos.service');

const uploadPhotoController = async (req, res) => {
    try {
        const response = await photoService.uploadPhotoService(req.file);

        res.status(response.response.status).json({
            ...response
        });
    } catch (err) {
        next(err);
    }
};

const getPhotosByProductController = async (req, res) => {
    try {
        const response = await photoService.getPhotosByProductService();

        res.status(response.response.status).json({
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