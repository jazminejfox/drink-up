// TODO
// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: ''
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log('Connected!');
//   con.query('CREATE DATABASE drinkup', function (err, result) {
//     if (err) throw err;
//     console.log('Database created');
//   });
// });

const mysql = require('mysql');
/*
  - Create a database connection and export it from this file.
  - You will need to connect with the user "root", no password,
    and to the database "chat".
*/

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'drinkupdata',
});

let start = connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('connected');
});

module.exports = {
  start,
  connection
};