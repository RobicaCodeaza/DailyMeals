import * as model from './model';
import { MODAL_CLOSE_SEC } from './config';
import RecipeView from './views/recipeView';
import SearchView from './views/searchView';
import ResultsView from './views/resultsView';
import PaginationView from './views/paginationView';
import BookmarksView from './views/bookmarksView';
import AddRecipeView from './views/addRecipeView';
import SidebarView from './views/SidebarView';

import 'core-js/actual'; // Polyfilling everything else
import 'regenerator-runtime'; // Polyfilling async await
import PaginationView from './views/paginationView';

let bookmarksView;
let recipeView;
let searchView;
let paginationView;
let addRecipeView;
let resultsView;
const sidebarView = new SidebarView();
// if (module.hot) {
//   module.hot.accept();
// }

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function (e) {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // 0.Update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // 1.Loading Recipe
    await model.loadRecipe(id);

    // 2.Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);

    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1. Get Search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2.Load search results
    await model.loadSearchResults(query);

    // 3.Render results
    // ResultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // 4.Render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};
// Listening for hash change
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
// Better way =>>

const controlPagination = function (goToPage) {
  // Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // Render new pagination
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings(in state)
  model.updateServings(newServings);

  // Update the recipe view
  // RecipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1.Add/remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else model.deleteBookmark(model.state.recipe.id);
  //2. Update recipe view
  recipeView.update(model.state.recipe);
  //3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show recipe
    addRecipeView.renderSpinner();

    // Uploading recipe to the api
    await model.uploadRecipe(newRecipe);

    //Render the recipe
    recipeView.render(model.state.recipe);

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // DispLay Success Message
    addRecipeView.renderMessage();

    // Change ID - URL without refresshing
    window.history.pushState(
      (pushState = null),
      (title = null),
      `${model.state.recipe.id}`
    );
    // Closing modal
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const initiateFunctionalityRecipesView = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

const initiateRecipesView = function () {
  bookmarksView = new BookmarksView();
  recipeView = new RecipeView();
  searchView = new SearchView();
  paginationView = new PaginationView();
  addRecipeView = new AddRecipeView();
  resultsView = new ResultsView();
};

sidebarView.render('MealsDashboardView');

const controlMenu = function (view) {
  sidebarView.render(view);

  if (view === 'MealsDashboardView') {
    bookmarksView = null;
    recipeView = null;
    searchView = null;
    paginationView = null;
    addRecipeView = null;
    searchView = null;
  }
  if (view === 'RecipesView') {
    initiateRecipesView();
    initiateFunctionalityRecipesView();
    bookmarksView.render(model.state.bookmarks);
  }
};
sidebarView.addHandlerRender(controlMenu);

console.log(document.querySelectorAll('.buttonMenu'));
