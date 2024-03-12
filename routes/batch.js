const express = require('express');
const { createBatch, getBatch, deleteBatch, updateBatch, getNumBatchesInInterval, getAllBatches } = require('../controllers/batchController');

const router = express.Router();

router.route('/')
    .post(createBatch)
    .get(getBatch)
    .put(updateBatch)
    .delete(deleteBatch);

router.get('/HL/:id', getNumBatchesInInterval);
router.get('/all', getAllBatches);

module.exports = router;