const { sendQuery, checkParams } = require('../utility/queries');
const { format } = require('node-pg-format');
const { createMealKitQuery, 
        createMealKitToIngredientQuery,
        getMealKitQuery,
        getMealKitIngredientsQuery,
        updateMealKitQuery,
        deleteMealKitQuery,
        deleteMealKitToIngredientQuery} = require('../queries/mealsQueries');

const { mostPopularMealsQuery } = require('../queries/highLevelQueries');

/**
 * @description Create a mealkit
 * @route POST /meals
 * @public
 */
const createMeal = async (req, res, next) => {
   // Assumes we have all fields, validated on client side
   const { Sku, Name, Desc, Diet, Ingredients } = req.body;

   if (checkParams([Sku, Name, Desc, Diet, Ingredients])) {
      res.status(401).send('Params missing');
      return;
   }

   try {
      const output = await sendQuery(createMealKitQuery, [Sku, Name, Desc, Diet]);
      const MealKitID = output.rows[0]['id'];

      Ingredients.forEach(async (ingredient) => {
         const MealKitSKU = Object.keys(ingredient)[0];
         const Quantity = ingredient[MealKitSKU];
         await sendQuery(createMealKitToIngredientQuery, [MealKitID, MealKitSKU, Quantity]);
      });

      res.status(201).send(output.rows[0]);
   } catch (error) {
      console.log(error);
      next(error);
   }
}

/**
 * @description Get a mealkit
 * @route GET /meals?sku=_
 * @public
 */
const getMeal = async (req, res, next) => {
   const { sku } = req.query;

   if(checkParams([sku])) {
      res.status(401).send('Params missing');
      return;
   }

   try {
      const MealKit = await sendQuery(getMealKitQuery, [sku]);
      const MealKitIngredients = await sendQuery(getMealKitIngredientsQuery, [sku]);

      const output = { MealKit: MealKit.rows[0], Ingredients: [] };
      MealKitIngredients.rows.forEach(row => {
         output['Ingredients'] = [...output['Ingredients'], row];
     });
      
      res.status(200).send(output);
   } catch (error) {
      console.log(error);
      next(error);
   }
}

/**
 * @description updates a mealkit
 * @route PUT /meals?column=_&value=_&sku=_
 * @public
 */
const updateMeal = async (req, res, next) => {
   const { column, value, sku } = req.query;

   if(checkParams([column, value, sku])) {
      res.status(401).send('Params missing');
      return;
   }

   const formattedQuery = format(updateMealKitQuery, column);
   try {
      const output = await sendQuery(formattedQuery, [value, sku]);
      res.status(200).send(output.rows[0]);
   } catch (error) {
      console.error(error);
      next(error);
   }
}

/**
 * @description deletes a mealkit
 * @route DELETE /meals?sku=_
 * @public
 */
const deleteMeal = async (req, res, next) => {
   const { sku } = req.query;

   if(checkParams([sku])) {
      res.status(401).send('Params missing');
      return;
   }
   
   try {
      //Delete the ingredients
      await sendQuery(deleteMealKitToIngredientQuery, [sku]);
      //Delete the meal kit
      await sendQuery(deleteMealKitQuery, [sku]);
      res.status(200).send('Deletion successful!');
   } catch (error) {
      console.error(error);
      next(error);
   }
}

/**
 * @description Get list of popular meals ordered within specific timeframe
 * @route GET /meals/HL/1?timeframe=_&limit=_
 * @public
 */

const getPopularMeals = async (req, res, next) => {
   const { timeframe, limit } = req.query;

   if(checkParams([timeframe, limit])) {
      res.status(401).send('Params missing');
      return;
   }

   try {
      const output = await sendQuery(mostPopularMealsQuery, [timeframe, limit]);
      res.status(201).send(output.rows);
   } catch (error) {
      console.log(error);
      next(error);
   }
}

module.exports = {
    createMeal,
    getMeal,
    updateMeal,
    deleteMeal,
    getPopularMeals
}