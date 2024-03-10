const { sendQuery, checkParams } = require('../utility/queries');
const { format } = require('node-pg-format');
const { createMealKitQuery, 
        createMealKitToIngredientQuery,
        getMealKitQuery,
        getMealKitIngredientsQuery,
        updateMealKitQuery,
        deleteMealKitQuery} = require('../queries/mealsQueries');

/**
 * @description Create a mealkit
 * @path POST /meals
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
 * @path GET /meals?sku=_
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
      
      res.status(200).send(MealKit.rows[0]);
   } catch (error) {
      console.log(error);
      next(error);
   }
}

/**
 * @description updates a mealkit
 * @path PUT /meals?column=_&value=_&sku=_
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
 * @path DELETE /meals?sku=_
 * @public
 */
const deleteMeal = async (req, res, next) => {
   const { sku } = req.query;

   if(checkParams([sku])) {
      res.status(401).send('Params missing');
      return;
   }
   
   try {
      await sendQuery(deleteMealKitQuery, [sku]);
      res.status(200).send('Deletion successful!');
   } catch (error) {
      console.error(error);
      next(error);
   }
}

module.exports = {
    createMeal,
    getMeal,
    updateMeal,
    deleteMeal
}