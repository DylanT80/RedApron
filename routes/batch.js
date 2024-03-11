const express = require('express');
const { createBatch, getBatch, deleteBatch, updateBatch } = require('../controllers/batchController');

const router = express.Router();

router.route('/')
    .post(createBatch)
    .get(getBatch)
    .put(updateBatch)
    .delete(deleteBatch);

module.exports = router;