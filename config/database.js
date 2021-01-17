const config = require("./settings");

module.exports = {
    connection: {
        host: config.sql.host,
        user: config.sql.user,
        password: config.sql.pass,
    },
    database: config.sql.database,
    users_table: config.sql.users_table,
};