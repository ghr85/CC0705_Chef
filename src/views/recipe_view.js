//Codeclan Week 07 Day 05
//Javascript, Pub Sub and Web APIs
//Weekend homework
// Recipe View

const RecipeView = function(container,recipe){
this.container = container
this.recipe = recipe
};


RecipeView.prototype.render = function () {

  const recipeDiv = document.createElement('div');
  recipeDiv.classList.add('recipe-div');
  this.container.appendChild(recipeDiv);

  const recipeHeader = document.createElement('h3');
  recipeHeader.classList.add('recipe-header');
  recipeHeader.textContent = this.recipe.title;
  recipeDiv.appendChild(recipeHeader);

  const recipeImage = document.createElement('img');
  recipeImage.classList.add('recipe-img');
  recipeImage.src = this.recipe.image;
  recipeImage.alt = `Image of ${this.recipe.title}`;

  const recipeLink = document.createElement('a');
  recipeLink.classList.add('recipe-img-link');
  recipeLink.href = this.recipe.link;
  recipeLink.innerHtml = recipeImage;
  recipeDiv.appendChild(recipeLink);
  recipeLink.appendChild(recipeImage);


};

module.exports = RecipeView
