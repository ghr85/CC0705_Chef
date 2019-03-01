//Codeclan Week 07 Day 05
//Javascript, Pub Sub and Web APIs
//Weekend homework
// Result View

const PubSub = require('../helpers/pub_sub.js')
const ResultView = function(){
  this.container = container;
};

ResultView.prototype.bindEvent = function () {
  PubSub.subscribe('Recipe:data-ready',(evt)=>{
    const RecipeAry = evt.detail;
    this.render(RecipeAry);
  });
};

ResultView.prototype.render = function (recipeAry) {
  recipeAry.forEach((recipe)=>{
    const recipe = new RecipeView(recipe)
    this.container.appendChild(recipe)
  })

};

module.exports = ResultView
