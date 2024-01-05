
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router
    .get('/', categoryController.getCategorysController)
    .post('/', categoryController.addCategoryController)
    .delete('/:id', categoryController.deleteCategoryController)

module.exports = router;