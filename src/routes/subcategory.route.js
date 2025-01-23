
const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/products/subcategory.controller');

router
    .get('/', subcategoryController.getSubcategoriesController)
    .get('/:id', subcategoryController.getSubcategoryController)
    .post('/', subcategoryController.addSubcategoryController)
    .patch('/:id', subcategoryController.editSubcategoryController)
    .patch('/activate/:id', subcategoryController.activateSubcategoryController)
    .patch('/deactivate/:id', subcategoryController.deactivateSubcategoryController)
    .delete('/:id', subcategoryController.deleteSubcategoryController)

module.exports = router;