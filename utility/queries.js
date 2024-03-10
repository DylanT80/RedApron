const pool = require('../config/dbConnection');

// Send a query to Postgres
const sendQuery = async (text, values) => {
    const client = await pool.connect();

    try {
        await client.query('BEGIN');
        const output = await client.query(text, values);
        await client.query('COMMIT');
        return output;
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
}

// Return true if missing params
const checkParams = (params) => {
    for (param in params) {
        if (!param) {
            return true;
        }
    }
    return false;
}

module.exports = {
    sendQuery,
    checkParams
}