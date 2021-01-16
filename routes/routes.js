const services = require('../services/services');

module.exports = (app) => {
    // Sign-up Page
    app.get("/", services.signup.signupGet);
    app.post("/", services.signup.signupPost);

    app.post("/failure", (req, res) => {
      // Redirects user back to sign-up page if they click the 'Try Again' button.
      res.redirect("/");
    });

    // Contact Page
    app.get("/contact", services.contact.contactGet);
    app.post("/contact", services.contact.contactPost);

    // Handling error page.
    app.all("*", (req, res) => {
        res.status(404);
        res.send('404 Not Found!');
        res.end();
    });
}