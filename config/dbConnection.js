const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'red-apron.cbwsykwgg8bi.us-west-2.rds.amazonaws.com',
    database: 'redapron',
    password: 'password',
    port: 5432
});

module.exports = pool;