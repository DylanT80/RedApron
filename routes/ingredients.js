const express = require('express');
const { createIngredient, getIngredient, updateIngredient, deleteIngredient, getExpiredIngredients } = require('../controllers/ingredientsController');

const router = express.Router();

router.route('/')
    .post(createIngredient)
    .get(getIngredient)
    .put(updateIngredient)
    .delete(deleteIngredient);

router.get('/HL/:id', getExpiredIngredients);

module.exports = router;