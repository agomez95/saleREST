
const express = require('express');
const router = express.Router();
const brandController = require('../controllers/brand.controller');

router
    // .get('/', categoryController.getCategorysController)
    .post('/', brandController.addBrandController)
    // .patch('/:id', categoryController.editCategoryController)
    // .patch('/activate/:id', categoryController.activateCategoryController)
    // .patch('/deactivate/:id', categoryController.deactivateCategoryController)
    // .delete('/:id', categoryController.deleteCategoryController)

module.exports = router;