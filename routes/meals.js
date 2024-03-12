const express = require('express');
const { createMeal, getMeal, updateMeal, deleteMeal, getPopularMeals, getAllMealKits } = require('../controllers/mealsController');

const router = express.Router();

router.route('/')
    .post(createMeal)
    .get(getMeal)
    .put(updateMeal)
    .delete(deleteMeal);

router.get('/HL/:id', getPopularMeals);

router.get('/all', getAllMealKits);

module.exports = router;