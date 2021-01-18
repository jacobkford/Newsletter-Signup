// Import data from .env file, which stores private data (e.g. API keys).
require("dotenv").config();
// Config file for confidential information.
const config = require("./config/settings");
const path = require("path");

// Variable for the web server application.
const app = require('express')();
// Local host port number.
const port = config.server.port || 3000;

// Sets up server configs.
require(path.resolve(__dirname + '/config/server'))(app);
// Sets up server site routes.
require(path.resolve(__dirname + '/routes/routes'))(app);

app.listen(port, () => {
  console.log(`[     PORT]: Listening on port ${port}.`);
  console.log(`[      CWD]: ${process.cwd()}`);
  console.log(`[BOOT TIME]: ${process.uptime() * 1000}ms`);
});