const { Pool } = require('pg');

const pool = new Pool({
    user:'postgres',
    host: 'localhost',
    database: 'webappdev_login',
    password:'admin',
    port: 5432,
});

module.exports = pool;