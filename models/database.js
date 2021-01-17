const config = require("../config/settings");
const mysql = require("mysql");

module.exports = mysql.createConnection({
    host: config.sql.host,
    port: config.sql.port,
    user: config.sql.user,
    password: config.sql.pass,
    database: config.sql.database,
    users_table: config.sql.users_table,
});