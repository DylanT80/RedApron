const express = require('express');
const { createIngredient, getIngredient, updateIngredient, deleteIngredient, getExpiringIngredients } = require('../controllers/ingredientsController');

const router = express.Router();

router.route('/')
    .post(createIngredient)
    .get(getIngredient)
    .put(updateIngredient)
    .delete(deleteIngredient);

router.get('/HL/:id', getExpiringIngredients);

module.exports = router;