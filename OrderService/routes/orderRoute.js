const express = require('express');
const orderContoller = require('../controllers/orderContoller');

const router = express.Router();

router.get('/', orderContoller.getAllByUserId);
router.post('/', orderContoller.createOrder);
router.get('/:id', orderContoller.getOrderById);
router.patch('/:id', orderContoller.updateOrderStatus);

module.exports = router;
