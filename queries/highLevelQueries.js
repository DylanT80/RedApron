//Expiring ingredients
const expiresTodayQuery = "SELECT Ingredient.name IngredientName, Batch.quantity \
                      FROM Ingredient \
                        JOIN BatchToIngredient ON (BatchToIngredient.IngredientID = Ingredient.id) \
                        JOIN Batch ON (Batch.id = BatchToIngredient.batchID) \
                      WHERE (SELECT CURRENT_DATE) > Batch.DeliveryDate + Ingredient.expiration \
                      ORDER BY Batch.quantity";

//Get the most popular meals given a specific interval (timeframe)
const mostPopularMealsQuery = "SELECT M.name Name, SUM(OI.quantity) OrderedAmount \
                               FROM OrderTable OT \
                                    JOIN OrderItem OI ON OI.OrderID = OT.ID \
                                    JOIN MealKit M ON M.ID = OI.MealKitID \
                               WHERE OT.OrderDate >= CURRENT_DATE - INTERVAL $1 \
                               ORDER BY OrderedAmount DESC";
        
//Creates a new batch for recently delivered batches
const createNewBatchQuery = "INSERT INTO Batch (BatchNumber, DeliveryDate, VendorID) \
                             VALUES ($1, $2, (SELECT Vendor.id FROM Vendor WHERE Vendor.name = $3))";
                            


//return customer info if their order contians a recalled ingredient
const recall = "SELECT Customer.firstName, Customer.lastName, Customer.phoneNumber, Customer.email \
                FROM CUSTOMER \
                JOIN OrderTable ON (OrderTable.CustomerID = Customer.ID \
                JOIN OrderItem ON (orderItem.OrderID = OrderTable.ID \
                JOIN Mealkit ON (MealKit.ID = OrderItem.MealKitID) \
                JOIN MealKitToIngredient ON (MealKitToIngredient.MealKitID = Ingredient.ID) \
                JOIN Ingredient ON (Ingredient.ID = MealKitToIngredient.IngredientID) \
                Join BatchToIngredient ON (BatchToIngredeint.IngredientID = Ingredient.ID) \
                WHERE BatchToIngredient.BatchID = $1";


//
const listActiveOrder = "SELECT OrderTable.OrderNumber, OrderStatus.Name \
                        FROM OrderTable \
                        JOIN OrderStatus ON (OrderStatus.ID = OrderTable.OrderStatus) \
                        WHERE OrderStatus.ID != 4 \
                        ORDER BY OrderTable.OrderNumber, OrderStaus.Name";

const listFufilledOrder =   "SELECT OrderTable.OrderNumber, OrderStatus.Name \
                            FROM OrderTable \
                            JOIN OrderStatus ON (OrderStatus.ID = OrderTable.OrderStatus) \
                            WHERE OrderStatus.ID = 4 \
                            ORDER BY OrderTable.OrderNumber, OrderStaus.Name";


const currentStock =    "SELECT i.Name, i.Expiration, i.CurrentAmount \
                        From Ingredient i \
                        Order BY i.Expiration DESC";


const weekGrossRevenue = "SELECT \
                         ";


module.exports = {
    expiresTodayQuery,
    recall,
    listActiveOrder,
    listFufilledOrder,
    currentStock
}