//EXPRESS
const { Router } = require('express');
const Recipes = Router();
//DB
// const { connect } = require('mysql2');
const db = require('../db');
//AXIOS
const axios = require('axios');

//REQUESTING API INFO
Recipes.get('/', (req, res) => {

//making a GET request to thecoctakdb API
axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
.then((response) => {
//sending the response object from the API to the client
  res.send(response.data.drinks);
})
.catch((err) => {
//if it didnt workingsending our error
  console.log(err, 'nah')
})

});



//POSTING TO THE DATABASE
Recipes.post('/', (req, res) => {

//deconstructing, creating SQL request, and values variable
const { title, image, id, instructions } = req.body
let sql = `INSERT INTO drinks (drinkname, imageroute, id, instructions) values (?, ?, ?, ?)`;
let values = [title, image, Number(id), instructions];

//connecting to database and inserting
db.connection.query(sql, values, (err, result) => {
      err ? console.log(err) : console.log('drink inserted');
    });

//sending confirmation response to the client
res.send('added to database, niceeee');

})



//DELETING FROM DATABASE
Recipes.delete('/', (req, res) => {

//deconstructing, creating SQL request, and values variable
const { title } = req.body
let sql = 'DELETE FROM drinks WHERE drinkname = ' + `'${title}'`;

//connecting to database and deleting
db.connection.query(sql, (err, result) => {
  err ? console.log(err) : console.log('number of rows deleted ' + result.affectedRows);
});

})



//REQUESTING FAVORITE INFO
Recipes.get('/favorites', (req, res) => {

//connecting to database and requesting all info from the saved drinks table
  db.connection.query('SELECT * FROM drinks', ((err, data) => {
    err ? callback(err) : res.send(data);
  }));

});


Recipes.post('/favorites', (req, res) => {
const { comment, drink } = req.body;

  let sql = `UPDATE drinks SET comments = '${comment}' WHERE drinkname = '${drink}'`

  //connecting to database and requesting all info from the saved drinks table
  db.connection.query(sql, ((err, result) => {
    err ? callback(err) : console.log('number of rows updated' + result.affectedRows);
  }));

  res.send('Comment succesful!');

  });


Recipes.post('/comments', (req, res) => {
  const { title } = req.body

let sql = `SELECT comments FROM drinks WHERE drinkname = '${title}'`
//connecting to database and requesting all info from the saved drinks table
db.connection.query(sql, ((err, data) => {
  err ? callback(err) : res.send(data[0].comments);
}));

});

module.exports = {
  Recipes,
};

