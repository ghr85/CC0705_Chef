//Codeclan Week 07 Day 05
//Javascript, Pub Sub and Web APIs
//Weekend homework
// Result View

const PubSub = require('../helpers/pub_sub.js')
const RecipeView = require('./recipe_view.js')

const ResultView = function(container_element){
  this.container = container_element;
};

ResultView.prototype.bindEvent = function () {
  PubSub.subscribe('Recipe:data-ready',(evt)=>{
    const RecipeAry = evt.detail;
    this.render(RecipeAry);
  });
};

ResultView.prototype.render = function (recipeAry) {
  console.log(recipeAry);
  recipeAry.forEach((recipe)=>{
    const recipeView = new RecipeView(this.container,recipe)
    recipeView.render()
  })

};

module.exports = ResultView
