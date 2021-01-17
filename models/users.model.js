const database = require('./database');

const User = function(user) {
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.status = user.status;
};

User.create = (newUser, result) => {
    database.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created User: ", newUser);
        result(null, newUser);
    });
};

module.exports = User;