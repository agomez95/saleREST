const express = require('express');
const router = express.Router();
const photoController = require('../controllers/products/photos.controller');

const fileMiddleware = require('../middlewares/file.middleware');

router
    .post('/upload', fileMiddleware, photoController.uploadPhotoController)

module.exports = router;