const express = require('express');
const router = express.Router();
const variantController = require('../controllers/variant.controller');

router
    .post('/', variantController.addVariantController)

module.exports = router;