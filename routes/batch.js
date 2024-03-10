const express = require('express');
const { createBatch, getBatch } = require('../controllers/batchController');

const router = express.Router();

router.route('/')
    .post(createBatch)
    .get(getBatch)

module.exports = router;