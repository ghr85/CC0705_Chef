//Codeclan Week 07 Day 05
//Javascript, Pub Sub and Web APIs
//Weekend homework
// Recipe Model

const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const Recipe = function(){
  this.recipeAry = [];
  this.url = null ;
};

Recipe.prototype.generateUrl = function (apiKeyInput,ingredientsInput) {
  const ingredients = this.processIngredients(ingredientsInput);
  this.url = `https://www.food2fork.com/api/search?key=${apiKeyInput}&q=${ingredients}`
};

Recipe.prototype.getData = function () {
  (new RequestHelper(this.url)).get()
  .then((data) => {
    const mapData = this.mapData(data);
    PubSub.publish('Recipe:data-ready', mapData)
  });
};

Recipe.prototype.mapData = function (data) {
  const recipeAry = data.recipes
  return recipeAry.map((recipe)=>{
    return {
      'title': recipe.title,
      'image': recipe.image_url,
      'link': recipe.source_url
    }
  });
};

Recipe.prototype.processIngredients = function (ingredientsInput) {
  const ingredientsAry = ingredientsInput.split(',')
  return this.processSpaces(ingredientsAry).join('');
};

Recipe.prototype.processSpaces = function (ingredientsAry) {
  return ingredientsAry.map((ingredient) => {
    const letters = ingredient.split('')
    letters.forEach((letter) => {
      if (letter === " ") {
        return "%20"
      }else{
        return letter
      };
    });
    return letters.join('');
  });
};

Recipe.prototype.bindEvent = function () {
  PubSub.subscribe('FormView:submit', (evt) =>{
    this.generateUrl(evt.detail.key_input,evt.detail.ingredients_input);
    this.getData();
  });
};

module.exports = Recipe;
