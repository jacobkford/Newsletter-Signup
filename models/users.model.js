const database = require('./database');

database.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`[ DATABASE]: ${database.state}`);

});

const User = function(user) {
    this.email = user.email;
    this.first_name = user.firstName;
    this.last_name = user.lastName;
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