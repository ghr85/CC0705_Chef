//Codeclan Week 07 Day 05
//Javascript, Pub Sub and Web APIs
//Weekend homework
// Recipe Model

const PubSub = require('../helpers/pub_sub.js')
const RequestHelper = require('../helpers/request_helper.js')

const Recipe = function(){
  this.recipeAry = [];
  this.url = 'https://www.food2fork.com/api/search?key=695b1efd9c794e99fb68cdf160379320&q=chicken'
};

Recipe.prototype.bindEvent = function () {

  PubSub.subscribe('FormView:submit', (evt) =>{
    const search_terms_obj = evt.detail;
    this.getData();
  });

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
  console.log(recipeAry);
};
module.exports = Recipe;
