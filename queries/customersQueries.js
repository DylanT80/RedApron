const createCustomerQuery = "INSERT INTO Customer(FirstName, LastName, Email, PhoneNumber, Address, City, StateID) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *";
const getCustomerQuery = "SELECT * FROM Customer WHERE Email = $1";
const updateCustomerQuery = "UPDATE Customer SET $1 = $2 WHERE Customer.email = $3";
const deleteCustomerQuery = "DELETE FROM Customer WHERE Email = $1";

module.exports = {
    createCustomerQuery,
    getCustomerQuery,
    updateCustomerQuery,
    deleteCustomerQuery
};