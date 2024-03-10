const pool = require('../config/dbConnection');

// Send a query to Postgres
const sendQuery = async (text, values) => {
    const client = await pool.connect();

    try {
        const output = await client.query(text, values);
        client.release();
        return output;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    sendQuery
}