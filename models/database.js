const config = require("../config/settings");
const mysql = require("mysql");

const database = mysql.createConnection({
    host: config.sql.host,
    port: config.sql.port,
    user: config.sql.user,
    password: config.sql.pass,
    database: config.sql.database,
    users_table: config.sql.users_table,
});

module.exports = database;