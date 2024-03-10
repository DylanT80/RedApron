const { sendQuery } = require('../utility/queries');
const { createCustomerQuery, deleteCustomerQuery } = require('../queries/customersQueries');

/**
 * @description Create a customer
 * @route POST /customers
 * @public
 */
const createCustomer = async (req, res, next) => {
    // Assumes we have all fields, validated on client side
    const { firstName, lastName, email, phoneNumber, address, city, state } = req.body;
    
    try {
        // const text = createCustomerQuery;
        // const values = [firstName, lastName, email, phoneNumber, address, city, state];
        // const output = await client.query(text, values);
        const output = await sendQuery(createCustomerQuery, [firstName, lastName, email, phoneNumber, address, city, state]);
        res.status(201).send(output.rows[0]);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

/**
 * @description Create a customer
 * @route DELETE /customers?email=_
 * @public
 */
const deleteCustomer = async (req, res, next) => {
    const { email } = req.query;

    try {
        const output = await sendQuery(deleteCustomerQuery, [email]);
        res.status(204).send(output.rows[0]);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getCustomerById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
}

module.exports = {
    createCustomer,
    getCustomerById,
    deleteCustomer
};