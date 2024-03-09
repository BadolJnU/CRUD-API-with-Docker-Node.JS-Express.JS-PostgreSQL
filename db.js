const { Pool } = require('pg')
const pool = new Pool ({
    host: 'db',
    port: 5432,
    user: 'badol',
    password: 'Badol2465',
    database: 'crud_database'
})

module.exports = pool