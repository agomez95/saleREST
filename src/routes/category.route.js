
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/products/category.controller');

router
    .get('/', categoryController.getCategorysController)
    .post('/', categoryController.addCategoryController)
    .patch('/:id', categoryController.editCategoryController)
    .patch('/activate/:id', categoryController.activateCategoryController)
    .patch('/deactivate/:id', categoryController.deactivateCategoryController)
    .delete('/:id', categoryController.deleteCategoryController)

module.exports = router;