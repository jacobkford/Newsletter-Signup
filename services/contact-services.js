// Used for sending users contact form data to the host/admins email address.
const nodemailer = require("nodemailer");
const path = require("path");

module.exports = {
    contactGet: (req, res) => {
      res.sendFile(path.normalize(__dirname + "/../views/contact.html"));
    },

    contactPost: (req, res) => {
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
        } else {
          console.log("Email sent: " + info.response);
          res.send("Success");
        }
      });

      console.log(req.body);
    }
}