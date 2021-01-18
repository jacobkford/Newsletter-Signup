// Exports data to be used in other files in the server.
module.exports = {
  server: {
    // Server port.
    port: parseInt(process.env.PORT),
  },

  // Mailchimp API data.
  mailchimp: {
    // The mailchimp API Key.
    key: process.env.API_KEY,
    // Auth user, read documentation for information.
    user: process.env.API_USER,
    // The server ID which the listing is being hosted.
    server: process.env.SERVER_ID,
    // The listing ID.
    list: process.env.LIST_ID,
  },

  // The host/admins email information.
  email: {
    // Service provider, e.g. google, hotmail, outlook.
    service: process.env.EMAIL_SERVICE,
    // The email address.
    user: process.env.EMAIL_ADDRESS,
    // The email password.
    pass: process.env.EMAIL_PASSWORD,
  },

  sql: {
    // MySQL connection username.
    user: process.env.SQL_USER,
    // MySQL connection password.
    pass: process.env.SQL_PASS,
    // MySQL host address.
    host: process.env.SQL_HOST,
    // MySQL host port.
    port: parseInt(process.env.SQL_PORT),
    // MySQL project database name.
    database: process.env.SQL_DB,
    // Users database table.
    users_table: process.env.SQL_TABLE_USERS,
  },
};