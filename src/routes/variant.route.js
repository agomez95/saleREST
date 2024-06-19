const express = require('express');
const router = express.Router();
const variantController = require('../controllers/products/variant.controller');

router
    .post('/', variantController.addVariantController)
    .post('/spec-val/', variantController.addVariantSpecificationValueController)
    .delete('/:id', variantController.deleteVariantController)

module.exports = router;