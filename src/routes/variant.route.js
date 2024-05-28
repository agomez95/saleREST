const express = require('express');
const router = express.Router();
const variantController = require('../controllers/products/variant.controller');

router
    .post('/', variantController.addVariantController)

module.exports = router;