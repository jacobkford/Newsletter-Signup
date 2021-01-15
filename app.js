// Enables the express web framework
const express = require("express");
// Gzip file format compression for faster network transfer.
const compression = require("compression");
// Creating file location paths.
const path = require("path");

// Config file for confidential information.
const config = require("./config");
// Index page routes file.
const index = require("./routes/index");
// Contact page routes file.
const contact = require("./routes/contact")


// Variable for the web server application.
const app = express();
// Local host port number.
const port = config.port || 3000;

// So we can use static (local) css/js/image files.
app.use(express.static(path.join(__dirname, 'public')));
// Pulling data from html body.
app.use(express.urlencoded());
// Compresses files to improve speed server side.
app.use(compression());

// Use the index.js file to handle endpoints that start with "/"
app.use(index);
// Use the contact.js file to handle endpoints that start with "/contact"
app.use(contact);

app.post("/failure", (req, res) => {
  // Redirects user back to sign-up page if they click the 'Try Again' button.
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}.\nlocalhost:${port}`);
});