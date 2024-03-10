const createMealKitQuery = "INSERT INTO MealKit(SKU, Name, Description, DietID) VALUES ($1, $2, $3, (SELECT ID FROM Diet WHERE Diet.name = $4)) RETURNING *";
const createMealKitToIngredientQuery = "INSERT INTO MealKitToIngredient(MealKitID, IngredientID, Quantity) VALUES ($1, (SELECT id FROM ingredient WHERE name = $2), $3) RETURNING *";

const getMealKitQuery = "SELECT * FROM MealKit WHERE sku = $1";
const getMealKitIngredientsQuery = "SELECT (SELECT sku FROM MealKit WHERE id = mealkitid), quantity FROM OrderItem WHERE orderid = (SELECT id FROM OrderTable WHERE OrderNumber = $1)";

const updateMealKitQuery = "UPDATE MealKit SET %s = $1 WHERE sku = $2 RETURNING *";

const deleteMealKitQuery = "DELETE FROM MealKit WHERE sku = $1";

module.exports = {
    createMealKitQuery,
    createMealKitToIngredientQuery,
    getMealKitQuery,
    getMealKitIngredientsQuery,
    updateMealKitQuery,
    deleteMealKitQuery
}