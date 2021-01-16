// Config file for confidential information.
const config = require("./config/settings");

// Variable for the web server application.
const app = require('express')();
// Local host port number.
const port = config.port || 3000;

// Sets up server configs.
require('./config/server')(app);
// Sets up server site routes.
require('./routes/routes')(app);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.\nlocalhost:${port}`);
});