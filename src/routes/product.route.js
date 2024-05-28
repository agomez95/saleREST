const express = require('express');
const router = express.Router();
const productController = require('../controllers/products/product.controller');

router
    .post('/', productController.addProductController)

module.exports = router;