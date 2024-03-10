const createOrderQuery = "INSERT INTO OrderTable(OrderNumber, CustomerID, OrderStatus, OrderDate) VALUES ($1, (SELECT id FROM Customer WHERE email = $2), (SELECT id FROM OrderStatus WHERE name = \'Unfulfilled\'), CURRENT_DATE) RETURNING *";
const createOrderItemQuery = "INSERT INTO OrderItem(OrderID, MealKitID, Quantity) VALUES ($1, (SELECT id FROM MealKit WHERE SKU = $2), $3)";
const updateOrderQuery = "UPDATE OrderTable SET %s = $1 WHERE id = (SELECT id FROM OrderTable WHERE OrderNumber = $2) RETURNING *";

const getOrderQuery = "SELECT * FROM OrderTable WHERE id = (SELECT id FROM OrderTable WHERE OrderNumber = $1)";
const getOrderItemQuery = "SELECT (SELECT sku FROM MealKit WHERE id = mealkitid), quantity FROM OrderItem WHERE orderid = (SELECT id FROM OrderTable WHERE OrderNumber = $1)";

const deleteOrderQuery = "DELETE FROM OrderTable WHERE id = (SELECT id FROM OrderTable WHERE OrderNumber = $1)";
const deleteOrderItemQuery = "DELETE FROM OrderItem WHERE OrderID = (SELECT id FROM OrderTable WHERE OrderNumber = $1)";


module.exports = {
    createOrderQuery,
    createOrderItemQuery,
    getOrderQuery,
    getOrderItemQuery,
    updateOrderQuery,
    deleteOrderQuery,
    deleteOrderItemQuery
}