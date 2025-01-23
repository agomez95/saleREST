
const express = require('express');
const router = express.Router();
const brandController = require('../controllers/products/brand.controller');

router
    .get('/', brandController.getBrandsController)
    .get('/:id', brandController.getBrandController)
    .post('/', brandController.addBrandController)
    .patch('/:id', brandController.editBrandController)
    .patch('/activate/:id', brandController.activateBrandController)
    .patch('/deactivate/:id', brandController.deactivateBrandController)
    .delete('/:id', brandController.deleteBrandController)

module.exports = router;