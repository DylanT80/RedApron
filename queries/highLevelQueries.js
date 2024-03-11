    //Expiring ingredients
const expiredIngredientsQuery = "SELECT Ingredient.name IngredientName, BatchToIngredient.quantity \
                                 FROM BatchToIngredient \
                                  JOIN Ingredient ON Ingredient.ID = BatchToIngredient.IngredientID \
                                  JOIN Batch ON Batch.id = BatchToIngredient.batchID \
                                 WHERE (SELECT CURRENT_DATE) > Batch.DeliveryDate + Ingredient.expiration \
                                 ORDER BY BatchToIngredient.quantity DESC";

//Get the most popular meals given a specific interval (timeframe)
const mostPopularMealsQuery = "SELECT M.name Name, SUM(OI.quantity) OrderedAmount \
                                FROM OrderTable OT \
                                    JOIN OrderItem OI ON OI.OrderID = OT.ID \
                                    JOIN MealKit M ON M.ID = OI.MealKitID \
                                WHERE OT.OrderDate >= CURRENT_DATE - ($1)::INTERVAL \
                                GROUP BY M.name \
                                ORDER BY OrderedAmount DESC";

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


//Gets the 
const listActiveOrders = "SELECT OrderTable.OrderNumber, OrderStatus.Name \
                        FROM OrderTable \
                        JOIN OrderStatus ON (OrderStatus.ID = OrderTable.OrderStatus) \
                        WHERE OrderStatus.ID != 4 \
                        ORDER BY OrderTable.OrderNumber, OrderStatus.Name";

const listFufilledOrders =   "SELECT OrderTable.OrderNumber, OrderStatus.Name \
                            FROM OrderTable \
                            JOIN OrderStatus ON (OrderStatus.ID = OrderTable.OrderStatus) \
                            WHERE OrderStatus.ID = 4 \
                            ORDER BY OrderTable.OrderNumber, OrderStaus.Name";


const currentStock =    "SELECT i.Name, i.Expiration, i.CurrentAmount \
                        From Ingredient i \
                        Order BY i.Expiration DESC";




module.exports = {
    expiredIngredientsQuery,
    mostPopularMealsQuery,
    recall,
    listActiveOrders,
    listFufilledOrders,
    currentStock
}