import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Drinks from './recipes';

import './App.css';

const App = () => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getDrinks();
  }, [])

  const getDrinks = () => {
   return axios.get('api/recipes')
    .then((response) => {
        setRecipes(response.data);
        console.log('getDrinks ran, recipes state set')
    })
    .catch((error) => {
      console.log(error, 'getDrinks failed')
    });
  }

  return (
  <div>
    <h1>DrinkUp!🍺 </h1>
    <form className= "search-form">
      <input className= "search-bar" type='text' />
      <button className= 'search-button' type='submit'>
        Search
      </button>
      </form>
      <div className= 'recipes'>
      {recipes.map((recipe, i) => (
        <Drinks key={i}
        id={recipe.idDrink}
        title={recipe.strDrink}
        instructions={recipe.strInstructions}
        image={recipe.strDrinkThumb}
        ingredients={recipe.strIngredient1}
        />
      ))}
      </div>
  </div>
  );

};

export default App;