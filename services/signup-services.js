// Enables ability to receive & send data to other APIs.
const https = require("https");
const path = require("path");
const User = require("../models/users.model");
const config = require("../config/settings");

module.exports = {
    signupGet: (req, res) => {
        res.sendFile(path.normalize(__dirname + "/../views/signup.html"));
    },

    signupPost: (req, res) => {
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

        let user = new User({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            status: "subscribed",
        });

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
                //res.sendFile(path.resolve("./views/success.html"));
                res.sendFile(path.normalize(__dirname + "/../views/success.html"));
            } else {
                // Sends to failure page if any errors.
                res.sendFile(path.normalize(__dirname + "/../views/failure.html"));
            };
      
            response.on("data", (data) => {
                /* Console logs all the data from the users sign-up request.
                *  Coverts the data back to json format for it to be readable. */
                console.log(JSON.parse(data));
            });
        });

        User.create(user, (err, data) => {
          if (err) {
            res
              .status(500)
              .send("Some error occurred while creating the user.");
          } 
        });

        /* Sends and writes the mailchimp data to the mailing list and 
        * returns the user either the 'Success' or 'Failure' page. */
        request.write(jsonData);
        // Finishes the request.
        request.end();
    }
}