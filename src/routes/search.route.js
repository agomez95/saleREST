
const express = require('express');
const router = express.Router();
const searchController = require('../controllers/products/search.controller');

router
    .get('/brand/:id', searchController.getProductsByBrandController)
    .get('/subcategory/:id', searchController.getProductsBySubcategoryController)
    .get('/product/:id', searchController.getDataByProductController)

module.exports = router;