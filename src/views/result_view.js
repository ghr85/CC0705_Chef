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
    const recipeAry = evt.detail;
    this.render(recipeAry);
  });

  PubSub.subscribe('Recipe:paginate',(evt)=>{
    const paginate = evt.detail;
    if (paginate === true){
      this.paginate();
    }else{
      this.remove_paginate()
    };
  });
};


ResultView.prototype.render = function (recipeAry) {
  recipeAry.forEach((recipe)=>{
    const recipeView = new RecipeView(this.container,recipe)
    recipeView.render()
  })

};

ResultView.prototype.paginate = function () {
  const buttonDiv = document.querySelector('#paginate_option');
  buttonDiv.innerHTML = '';

  const button = document.createElement('button');
  button.id = 'paginate'
  button.innerHTML = 'See More Recipes';
  buttonDiv.appendChild(button);

  PubSub.publish('ResultView:button-rendered',true)
};

ResultView.prototype.remove_paginate = function () {

  const buttonDiv = document.querySelector('#paginate_option');
  buttonDiv.innerHTML = '';
  PubSub.publish('ResultView:button-rendered',false)
};

module.exports = ResultView
