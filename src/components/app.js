import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Drinks from './recipes';

import appStyle from './app.css';

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

  const getFavorites = () => {
    return axios.get('api/recipes/favorites')
    .then((response) => {
      console.log('original state', recipes);

      let drinkArray = response.data.reduce((arr, drinkObj) => {
        let drink = {
          strDrink: drinkObj.drinkname,
          strInstructions: drinkObj.instructions,
          strDrinkThumb: drinkObj.imageroute
        }
        arr.push(drink);
        return arr;
      }, []);
      console.log('new drinkarray', drinkArray);

      setRecipes(drinkArray);
      console.log('getFavorites ran, this is your new state', recipes);
    })
    .catch((error) => {
      console.log(error, 'getFavorites failed');
    })
  };

  const filterHandle = (e) => {
    if(e.target.value === 'all'){
      getDrinks();
    } else if (e.target.value === 'favorites'){
      getFavorites();
    }
  }

  return (
  <div className='app'>
    <h1 style={{marginTop: 0}}>DrinkUp!🍺</h1>
    <form className= "search-form">
      <input className= "search-bar" type='text' />
      <button className= 'search-button' type='submit'>
        Search
      </button>
      <div className="select">
          <select onChange={filterHandle} name="select" className="filter">
          <option value="all">All</option>
          <option value="favorites">Favorites</option>
    </select>
    </div>
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