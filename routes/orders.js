const express = require('express');
const { createOrder, deleteOrder, updateOrder, getOrder } = require('../controllers/ordersController');

const router = express.Router();

router.route('/')
    .post(createOrder)
    .get(getOrder)
    .put(updateOrder)
    .delete(deleteOrder);

module.exports = router;