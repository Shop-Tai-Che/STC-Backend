const express = require('express');
const productController = require('../controllers/productController');

const router = express.Router();

router.get('/', productController.getAll);

router.get('/shop', productController.getAllProductsByShopId);

router.get('/suggestion', productController.getMostLovedProducts);

router.get('/:id', productController.getById);

module.exports = router;
