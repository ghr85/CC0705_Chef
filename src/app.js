const Recipe = require('./models/recipe.js');
// const RecipeView = require('./views/recipe_view.js');
const RecipeFormView = require('./views/recipe_form_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');
//on dom load, set up model listener for Submit
//set up result view listener for data retrieved
const container_element = document.querySelector('#results')
const recipe = new Recipe();
recipe.bindEvent();

const recipeFormView = new RecipeFormView();
recipeFormView.bindEvent();


// const recipeView = new RecipeView(container_element);
// recipeView.bindEvent();
});
