const express = require('express');
const { createMeal, deleteMeal, updateMeal, getMeal } = require('../controllers/mealsController');

const router = express.Router();

router.route('/')
    .post(createMeal)
    .get(getMeal)
    .put(updateMeal)
    .delete(deleteMeal);

module.exports = router;