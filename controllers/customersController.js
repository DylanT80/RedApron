const pool = require('../config/dbConnection');

const { Client } = require('pg');

// Retrieve RDS connection information from environment variables
const dbConfig = {
    user: 'postgres',
    host: 'red-apron.cbwsykwgg8bi.us-west-2.rds.amazonaws.com',
    database: 'redapron',
    password: 'RedApron',
    port: 5432
};

/**
 * @description Create a customer
 * @route POST /customers
 * @public
 */
const createCustomer = async (req, res, next) => {
    // Assumes we have all fields, validated on client side
    const { firstName, lastName, email, phoneNumber, address, city, state } = req.body;

    const client = new Client(dbConfig);
    try {
        await client.connect();
        const output = await client.query('SELECT * FROM state');
        res.send(output);
    } catch (error) {
        console.error(error);
    }


    res.status(201).send('Customer created!');
}

const getCustomerById = async (req, res, next) => {
    const id = req.params.id;
    console.log(id);
}

module.exports = {
    createCustomer,
    getCustomerById
};