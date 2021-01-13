// Import data from .env file, which stores private data (e.g. API keys).
require("dotenv").config();

// Enables the express web framework
const express = require("express");
// Enables ability to receive & send data to other APIs.
const https = require("https");
// Used for parsing through html files to pull user inputted data.
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

// Variable for the web server application.
const app = express();
// Local host port number.
const port = process.env.PORT;

// So we can use static (local) css/javascript/image files.
app.use(express.static("public"));
// Pulling data from html body.
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  // Loads Signup page when user enters url.
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
  // Creating variables for the users data.
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  // Inputting & formatting the users data to json for the mailchimp api post request.
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };
  
  // Converting the users json data to a string to lower file size when being sent.
  const jsonData = JSON.stringify(data);
  // Listing ID.
  const listID = process.env.LIST_ID;
  // Mailchimp server ID for the listing address.
  const serverID = process.env.SERVER_ID;
  // The mailing list id URL.
  const url = `https://${serverID}.api.mailchimp.com/3.0/lists/${listID}`;
  /* Setting the request options to send data to the mailing list. 
  *  Which will be a post request & will include admin username & api key. */
  const apiUser = process.env.API_USER;
  const apiKey = process.env.API_KEY;
  const options = {
    method: "POST",
    auth: `${apiUser}:${apiKey}`
  };
  // Post request to the mailchimp listing database.
  const request = https.request(url, options, (response) => {
    if (response.statusCode === 200) {
      // Sends to success page if no error and data has been sent correctly.
      res.sendFile(__dirname + "/success.html");
    } else {
      // Sends to failure page if any errors.
      res.sendFile(__dirname + "/failure.html");
    };
    
    response.on("data", (data) => {
      /* Console logs all the data from the users sign-up request.
      *  Coverts the data back to json format for it to be readable. */
      console.log(JSON.parse(data));
    });
  });
  /* Sends and writes the mailchimp data to the mailing list and 
  * returns the user either the 'Success' or 'Failure' page. */
  request.write(jsonData);
  // Finishes the request.
  request.end();
});

app.post("/failure", (req, res) => {
  // Redirects user back to sign-up page if they click the 'Try Again' button.
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}.\nlocalhost:${port}`);
});