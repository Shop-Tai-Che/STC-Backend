const express = require('express');
const loveController = require('../controllers/loveController');

const router = express.Router();

router.post('/', loveController.loveProduct);

module.exports = router;
