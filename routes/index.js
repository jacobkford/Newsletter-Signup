// Enables the express web framework
const express = require("express");
// Enables ability to receive & send data to other APIs.
const https = require("https");
// Creating file location paths.
const path = require("path");

// Config file for confidential information.
const config = require("../config");

let router = express.Router();

// Sign-Up page
router
  .route("/")
  .get((req, res) => {
    // Loads Signup page when user enters url.
    res.sendFile(path.resolve("./views/signup.html"));
  })

  .post((req, res) => {
    // Inputting & formatting the users data to json for the mailchimp api post request.
    let data = {
      members: [
        {
          email_address: req.body.email,
          status: "subscribed",
          merge_fields: {
            FNAME: req.body.firstName,
            LNAME: req.body.lastName,
          },
        },
      ],
    };

    // Converting the users json data to a string to lower file size when being sent.
    let jsonData = JSON.stringify(data);
    // The mailing list id URL.
    let url = `https://${config.mailchimp.server}.api.mailchimp.com/3.0/lists/${config.mailchimp.list}`;
    /* Setting the request options to send data to the mailing list. 
    *  Which will be a post request & will include admin username & api key. */
    let options = {
      method: "POST",
      auth: `${config.mailchimp.user}:${config.mailchimp.key}`,
    };
    // Post request to the mailchimp listing database.
    const request = https.request(url, options, (response) => {
      if (response.statusCode === 200) {
        // Sends to success page if no error and data has been sent correctly.
        res.sendFile(path.resolve("./views/success.html"));
      } else {
        // Sends to failure page if any errors.
        res.sendFile(path.resolve("./views/failure.html"));
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

  module.exports = router;