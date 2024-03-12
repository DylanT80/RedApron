const express = require('express');
const { createOrder, deleteOrder, updateOrder, getOrder, getActiveOrders, getAllOrders } = require('../controllers/ordersController');

const router = express.Router();

router.route('/')
    .post(createOrder)
    .get(getOrder)
    .put(updateOrder)
    .delete(deleteOrder);

router.get('/HL/:id', getActiveOrders);
router.get('/all', getAllOrders)

module.exports = router;