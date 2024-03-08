const express = require('express');
const { getCustomerById } = require('../controllers/customersController');

const router = express.Router();

router.get('/:id', getCustomerById);

module.exports = router;
