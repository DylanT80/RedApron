const express = require('express');
const { createCustomer, getCustomer, updateCustomer, deleteCustomer, getCustomersByState, getAllCustomers } = require('../controllers/customersController');

const router = express.Router();

router.route('/')
    .post(createCustomer)
    .get(getCustomer)
    .put(updateCustomer)
    .delete(deleteCustomer);

router.route('/all').get(getAllCustomers);
router.get('/HL/:id', getCustomersByState);

module.exports = router;