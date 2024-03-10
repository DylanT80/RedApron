const express = require('express');
const { createIngredient, getIngredient, updateIngredient, deleteIngredient } = require('../controllers/ingredientsController');

const router = express.Router();

router.route('/')
    .post(createIngredient)
    .get(getIngredient)
    .put(updateIngredient)
    .delete(deleteIngredient);

module.exports = router;