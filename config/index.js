// Import data from .env file, which stores private data (e.g. API keys).
require("dotenv").config();
// Exports data to be used in other files in the server.
module.exports = {
  port: parseInt(process.env.PORT),
  mailchimp: {
    key: process.env.API_KEY,
    user: process.env.API_USER,
    server: process.env.SERVER_ID,
    list: process.env.LIST_ID,
  },
  email: {
    service: process.env.EMAIL_SERVICE,
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
};