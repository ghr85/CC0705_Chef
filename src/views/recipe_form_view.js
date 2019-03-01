//Codeclan Week 07 Day 05
//Javascript, Pub Sub and Web APIs
//Weekend homework
// Recipe Model
const PubSub = require('../helpers/pub_sub.js')

const RecipeFormView = function(){
 this.recipeFormView = document.querySelector('#recipe_form')
};

RecipeFormView.prototype.bindEvent = function () {
  this.recipeFormView.addEventListener('submit',(evt) => {
    evt.preventDefault();
    const ingredientsInput = evt.target.ingredients_input.value;
    const mealInput = evt.target.meal_input.value;
    PubSub.publish('FormView:submit',{
      'ingredients_input': ingredientsInput,
      'meal_input': mealInput
    });
  });
};


module.exports = RecipeFormView;
