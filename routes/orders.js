const express = require('express');
const { createOrder, deleteOrder, updateOrder, getOrder, getActiveOrders } = require('../controllers/ordersController');

const router = express.Router();

router.route('/')
    .post(createOrder)
    .get(getOrder)
    .put(updateOrder)
    .delete(deleteOrder);

router.get('/HL/:id', getActiveOrders);

module.exports = router;