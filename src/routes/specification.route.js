const express = require('express');
const router = express.Router();
const specificationController = require('../controllers/products/specification.controller');

router
    .post('/', specificationController.addSpecificationController)

module.exports = router;