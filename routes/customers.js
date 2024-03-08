const express = require('express');
const { createCustomer, getCustomerById } = require('../controllers/customersController');

const router = express.Router();

router.post('/', createCustomer);
router.get('/:id', getCustomerById);

module.exports = router;
