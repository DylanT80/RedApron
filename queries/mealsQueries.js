const createMealKitQuery = "INSERT INTO MealKit(SKU, Name, Description, DietID) VALUES ($1, $2, $3, (SELECT ID FROM Diet WHERE Diet.name = $4)) RETURNING *";
const createMealKitToIngredientQuery = "INSERT INTO MealKitToIngredient(MealKitID, IngredientID, Quantity) VALUES ($1, (SELECT id FROM ingredient WHERE name = $2), $3) RETURNING *";

const getMealKitQuery = "SELECT * FROM MealKit WHERE sku = $1";
const getMealKitIngredientsQuery = "SELECT I.name, quantity FROM MealKitToIngredient M JOIN Ingredient I ON I.ID = M.IngredientID WHERE MealKitID = (SELECT ID FROM MealKit WHERE Sku = $1)";
const getAllMealKitQuery = "SELECT * FROM MealKit";

const updateMealKitQuery = "UPDATE MealKit SET %s = $1 WHERE sku = $2 RETURNING *";
const updateIngredientQuery = "UPDATE MealKitToIngredient SET %s = $1 WHERE ";

const deleteMealKitQuery = "DELETE FROM MealKit WHERE sku = $1";
const deleteMealKitToIngredientQuery = "DELETE FROM MealKitToIngredient WHERE MealKitID = (SELECT id FROM MealKit WHERE SKU = $1)";

module.exports = {
    createMealKitQuery,
    createMealKitToIngredientQuery,
    getMealKitQuery,
    getMealKitIngredientsQuery,
    getAllMealKitQuery,
    updateMealKitQuery,
    deleteMealKitQuery,
    deleteMealKitToIngredientQuery
}