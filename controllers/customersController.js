const { sendQuery, checkParams } = require('../utility/queries');
const { format } = require('node-pg-format');
const { createCustomerQuery, getCustomerQuery, updateCustomerQuery, deleteCustomerQuery } = require('../queries/customersQueries');

/**
 * @description Create a customer
 * @route POST /customers
 * @public
 */
const createCustomer = async (req, res, next) => {
    // Assumes we have all fields, validated on client side
    const { firstName, lastName, email, phoneNumber, address, city, state } = req.body;
    
    if (checkParams([firstName, lastName, email, phoneNumber, address, city, state])) {
        res.status(401).send('Params missing');
        return;
    }

    try {
        const output = await sendQuery(createCustomerQuery, [firstName, lastName, email, phoneNumber, address, city, state]);
        res.status(201).send(output.rows[0]);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

/**
 * @description Get a customer
 * @route GET /customers?email=_
 * @public
 */
const getCustomer = async (req, res, next) => {
    const { email } = req.query;

    if (checkParams([email])) {
        res.status(401).send('Params missing');
        return;
    }

    try {
        const output = await sendQuery(getCustomerQuery, [email]);
        res.status(200).send(output.rows[0]);
    } catch (error) {
        console.error(error);
        next(error);
    }
}

/**
 * @description Update a customer
 * @route PUT /customers?column=_&value=_&email=_
 * @public
 */
const updateCustomer = async (req, res, next) => {
    const { column, value, email } = req.query;

    if (checkParams([column, value, email])) {
        res.status(401).send('Params missing');
        return;
    }
    
    const formattedQuery = format(updateCustomerQuery, column);
    try {
        const output = await sendQuery(formattedQuery, [value, email]);
        res.status(200).send(output.rows[0]);
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

    if (checkParams([email])) {
        res.status(401).send('Params missing');
        return;
    }
    
    try {
        await sendQuery(deleteCustomerQuery, [email]);
        res.status(204).send('Deletion successful!');
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    createCustomer,
    getCustomer,
    updateCustomer,
    deleteCustomer
};