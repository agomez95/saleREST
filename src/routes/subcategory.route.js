
const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategory.controller');

router
    .get('/', subcategoryController.getSubcategorysController)
    .post('/', subcategoryController.addSubcategoryController)
    .patch('/name/:id', subcategoryController.editNameSubcategoryController)
    .patch('/category/:id', subcategoryController.editCategorySubcategoryController)
    .patch('/activate/:id', subcategoryController.activateSubcategoryController)
    .patch('/deactivate/:id', subcategoryController.deactivateSubcategoryController)
    .delete('/:id', subcategoryController.deleteSubcategoryController)

module.exports = router;