//Codeclan Week 07 Day 05
//Javascript, Pub Sub and Web APIs
//Weekend homework
// Recipe Model

const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const Recipe = function(){
  this.recipeAry = [];
  this.url = null ;
  this.currentQuery = null;
  this.currentApi = null;
  this.page_int = 1;
};

Recipe.prototype.generateUrl = function (apiKeyInput,ingredientsInput) {
  const ingredients = this.processIngredients(ingredientsInput);
  this.currentQuery = ingredients;
  this.currentApi = apiKeyInput;
  this.url = `https://www.food2fork.com/api/search?key=${this.currentApi}&q=${this.currentQuery}&page=${this.page_int}`
};

Recipe.prototype.getData = function () {
  (new RequestHelper(this.url)).get()
  .then((data) => {
    const mapData = this.mapData(data);
    PubSub.publish('Recipe:data-ready', mapData)
  });
};

Recipe.prototype.mapData = function (data) {
  const recipeAry = data.recipes;
  this.paginate(recipeAry);
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
    const letters = ingredient.split('');
    const processed = letters.map((letter) => {
      if (letter == " ") {
        return "%20";
      }else{
        return letter
      };
    });
    return processed.join('');
  });
};

Recipe.prototype.paginate = function (recipeAry) {
  if (recipeAry.length === 30) {
    this.page_int += 1
    PubSub.publish("Recipe:paginate",true)
  }else{
    PubSub.publish("Recipe:paginate",false)
    return
  };
};

Recipe.prototype.newRequest = function () {
  this.page_int = 1;
  document.getElementById('recipe_form').reset()
  document.querySelector('#results').innerHTML = '';
};

Recipe.prototype.bindEvent = function () {
  PubSub.subscribe('FormView:submit', (evt) =>{
    this.newRequest();
    this.generateUrl(evt.detail.key_input,evt.detail.ingredients_input);
    this.getData();

  });
  PubSub.subscribe('ResultView:button-rendered', (evt) =>{
    if (evt.detail === true){
      const button = document.querySelector('#paginate')
      button.addEventListener('click',(evt)=>{
        PubSub.publish('Recipe:paginate',false);
        this.generateUrl(this.currentApi,this.currentQuery);
        this.getData();
      });
    }
  });

};

module.exports = Recipe;
