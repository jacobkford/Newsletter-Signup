const mysql = require('mysql');
const database = require('./database');
const connection = mysql.createConnection(database.connection);