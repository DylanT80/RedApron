const express = require('express');
const { createCustomer, getCustomerById, deleteCustomer } = require('../controllers/customersController');

const router = express.Router();

router.route('/').post(createCustomer).delete(deleteCustomer);
router.get('/:id', getCustomerById);

module.exports = router;