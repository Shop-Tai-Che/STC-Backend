const express = require('express');
const shopController = require('../controllers/shopController');

const router = express.Router();

router.get('/:id', shopController.countProductsAndReviews);

module.exports = router;
