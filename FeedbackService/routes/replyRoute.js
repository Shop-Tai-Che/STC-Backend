const express = require('express');
const replyController = require('../controllers/replyController');

const router = express.Router();

router.post('/', replyController.createReply);

module.exports = router;
