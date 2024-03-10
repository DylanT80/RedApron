const express = require('express');
const { createCustomer, getCustomer, updateCustomer, deleteCustomer } = require('../controllers/customersController');

const router = express.Router();

router.route('/')
    .post(createCustomer)
    .get(getCustomer)
    .put(updateCustomer)
    .delete(deleteCustomer);

module.exports = router;