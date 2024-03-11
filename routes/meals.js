const express = require('express');
const { createMeal, getMeal, updateMeal, deleteMeal, getPopularMeals } = require('../controllers/mealsController');

const router = express.Router();

router.route('/')
    .post(createMeal)
    .get(getMeal)
    .put(updateMeal)
    .delete(deleteMeal);

router.get('/HL/:id', getPopularMeals);

module.exports = router;