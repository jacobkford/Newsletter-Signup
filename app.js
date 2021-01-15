// Enables the express web framework
const express = require("express");
// Enables ability to receive & send data to other APIs.
const https = require("https");
// Used for sending users contact form data to the host/admins email address.
const nodemailer = require("nodemailer");
// Config file for confidential information.
const config = require('./config');
// Creating file location paths.
const path = require('path');

// Variable for the web server application.
const app = express();
// Local host port number.
const port = config.port;

// So we can use static (local) css/js/image files.
app.use(express.static(path.join(__dirname, 'public')));
// Pulling data from html body.
app.use(express.urlencoded());

app.get("/", (req, res) => {
  // Loads Signup page when user enters url.
  res.sendFile(path.join(__dirname, 'views', 'signup.html'));
});

app.post("/", (req, res) => {
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
      res.sendFile(path.join(__dirname, 'views', 'success.html'));
    } else {
      // Sends to failure page if any errors.
      res.sendFile(path.join(__dirname, 'views', 'failure.html'));
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

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.html'));
});

app.post("/contact", (req, res) => {
  // Creating the mailing address for the contact from.
  let transporter = nodemailer.createTransport({
    service: config.email.service, // Visit https://nodemailer.com/smtp/well-known/ for list of services.
    tls: {
      // tls options added to fix a bug where the mails wouldn't send.
      rejectUnauthorized: false,
      strictSSL: false,
    },
    auth: {
      user: config.email.user,
      pass: config.email.pass,
    },
  });
  // Inputting & formatting the form data into an email format.
  let mailOptions = {
    from: req.body.email,
    to: config.email.user,
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message,
  };
  // If successful sends the mail, if not returns an error message.
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error");
    }
    else {
      console.log('Email sent: ' + info.response);
      res.send("Success");
    }
  });

  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}.\nlocalhost:${port}`);
});