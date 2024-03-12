const createBatchQuery = "INSERT INTO Batch(BatchNumber, DeliveryDate, VendorID) VALUES ($1, CURRENT_DATE, (SELECT id FROM Vendor WHERE Name = $2)) RETURNING *";
const createBatchIngredientQuery = "INSERT INTO BatchToIngredient(IngredientID, BatchID, Quantity) VALUES ((SELECT id FROM Ingredient WHERE Name = $1), $2, $3)";

const getBatchQuery = "SELECT * FROM Batch WHERE id = (SELECT id FROM Batch WHERE BatchNumber = $1)";
const getBatchIngredientQuery = "SELECT (SELECT name FROM Ingredient WHERE id = ingredientid), quantity FROM BatchToIngredient WHERE batchid = (SELECT id FROM Batch WHERE batchnumber = $1)";
const getAllBatchesQuery = "SELECT * FROM Batch";

const updateBatchQuery = "UPDATE Batch SET %s = $1 WHERE id = (SELECT id FROM Batch WHERE BatchNumber = $2) RETURNING *";

const deleteBatchQuery = "DELETE FROM Batch WHERE id = (SELECT id FROM Batch WHERE BatchNumber = $1)";
const deleteBatchIngredientQuery = "DELETE FROM BatchToIngredient WHERE BatchID = (SELECT id FROM Batch WHERE BatchNumber = $1)";

module.exports = {
    createBatchQuery,
    createBatchIngredientQuery,
    getBatchQuery,
    getBatchIngredientQuery,
    getAllBatchesQuery,
    updateBatchQuery,
    deleteBatchQuery,
    deleteBatchIngredientQuery
}