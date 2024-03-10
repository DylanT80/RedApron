const createIngredientQuery = "INSERT INTO Ingredient (Name, Expiration, CurrentAmount, MinimumAmount) VALUES($1, $2, $3, $4) RETURNING *";
const getIngredientQuery = "SELECT * FROM Ingredient WHERE Ingredient.name = $1";
const updateIngredientQuery = "UPDATE Ingredient SET %s = $1 WHERE Ingredient.name = $2 RETURNING *";
const deleteIngredientQuery = "DELETE FROM Ingredient WHERE Name = $1";


module.exports = {
    createIngredientQuery,
    getIngredientQuery,
    updateIngredientQuery,
    deleteIngredientQuery
};