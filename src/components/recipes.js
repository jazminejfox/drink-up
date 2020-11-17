import React, { useEffect, useState } from 'react';
import axios from 'axios';
import style from './Recipes.module.css';


const Drinks = ({ title, instructions, image, ingredients, id }) => {


 const saveDrink = (title, image, instructions, id) => {

  let drinkObj = {
     title: title,
     image: image,
     id: id,
     instructions: instructions
    };

  return axios.post('api/recipes', drinkObj.title)
  .then((response) => {
    console.log(response.data, 'post successful');
  })
  .catch((error) => {
    console.log(error, 'post unsuccessful')
  });

  };



  const deleteDrink = (title, image, instructions, id) => {

    let drinkObj = {
      title: title,
      image: image,
      id: id,
      instructions: instructions
     };
   return axios.delete('api/recipes', {data: drinkObj.title})
   .then((response) => {
     console.log(response.data, 'DELETE successful');
   })
   .catch((error) => {
     console.log(error, 'DELETE unsuccessful')
   });

   };



  return (
  <div className={style.recipe}>
      <h1>{title}</h1>
      <img src= {image} alt="" className={style.img}/>
      <p>{instructions}</p>
      <div className={style.btngrp}>
      <button className={style.btn} onClick={() => saveDrink({title, image, instructions, id})}>🧡</button>
      <button className={style.btn} onClick={() => deleteDrink({title, image, instructions, id})}>💔 </button>
      <button className={style.btn}>✍</button>
      </div>
  </div>
  );

};

export default Drinks;