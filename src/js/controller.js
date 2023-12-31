import * as model from './model';
import { MODAL_CLOSE_SEC } from './config';
import 'regenerator-runtime'; // Polyfilling async await
import 'core-js/actual'; // Polyfilling everything else

// Importing RecipesViewDashboard

import RecipeView from './RecipesView/recipeView';
import SearchView from './RecipesView/searchView';
import ResultsView from './RecipesView/resultsView';
import PaginationView from './RecipesView/paginationView';
import BookmarksView from './RecipesView/bookmarksView';
import AddRecipeView from './RecipesView/addRecipeView';

let bookmarksView,
  recipeView,
  searchView,
  paginationView,
  addRecipeView,
  resultsView;

// Importing MealsDashboardView
import CalendarView from './MealsDashboardView/CalendarView';
import AddMealsView from './MealsDashboardView/AddMealsView';
import GraphGeneralView from './MealsDashboardView/GraphGeneralView';
import RegisterPersonalStatsView from './MealsDashboardView/RegisterPersonalStatsView';
import MealStatsView from './MealsDashboardView/MealStatsView';
import GraphStatsView from './MealsDashboardView/GraphStatsView';

let calendarView,
  addMealsView,
  graphGeneralView,
  registerPersonalStatsView,
  mealStatsView,
  graphStatsView;

// Importing Sidebar
import SidebarView from './views/SidebarView';
import { async } from 'regenerator-runtime';
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

    recipeView.addHandlerAddMeal(controlAddMealTime);
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
      addRecipeView.render('_');
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
};

const controlAddMealTime = async function (mealTime) {
  try {
    model.mealTimeSet(mealTime);
    await model.addMeal();
    controlMenu();
    // controlAddMeals();
  } catch (err) {
    alert(err.message);
  }
};

const initRecipesView = function () {
  bookmarksView = new BookmarksView();
  recipeView = new RecipeView();
  searchView = new SearchView();
  paginationView = new PaginationView();
  addRecipeView = new AddRecipeView();
  resultsView = new ResultsView();
};

const initFncRecipesView = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};

// -----------------------------
// MealsDashboardView
const controlCalendarRender = function () {
  calendarView.renderCalendar(model.dayjsFormat(), controlCalendarChange);
};
const controlCalendarChange = function (date) {
  model.setDay(date);
  controlAddMeals();
  graphGeneralView.resetBtns();
  controlLoadGeneralGraphs();
  controlRenderStats();
  controlLoadStatsGraphs();
};

const controlMealTimeRender = function (mealTime) {
  controlMenu('RecipesView');
  model.mealTimeSet(mealTime);
};

const controlAddMeals = async function () {
  model.findMealDaily();
  if (model.state.mealDaily.added) {
    addMealsView.render(model.state.mealDaily.meals);
  } else addMealsView.update(model.state.mealDaily.meals);
};
const controlDeleteMeals = function (mealId, mealTime) {
  model.deleteMeal(mealId, mealTime);
  addMealsView.update(model.state.mealDaily.meals);

  controlLoadGeneralGraphs();
  model.calcMealDailyStats();
  mealStatsView.update(model.state);
  controlLoadStatsGraphs();
};

const controlLoadGeneralGraphs = async function (
  graphType = 'general-day-calories-split'
) {
  try {
    graphGeneralView.renderSpinner();
    await model.loadGeneralGraph(graphType);
  } catch (err) {
    graphGeneralView.renderError(err.message);
  }
};
const controlRenderStats = function () {
  model.calcMealDailyStats();
  model.findPersonalStatsForDay();
  mealStatsView.render(model.state);
};
const controlRenderCurrentGoal = function () {
  // model.calcCurrentGoal();
  registerPersonalStatsView.render(model.state.personal);
  registerPersonalStatsView.addHandlerToggle();
};
const controlRegisterPersonalStats = function (data) {
  model.addPersonalStats(data);
  console.log(model.state.meals);

  registerPersonalStatsView.render(model.state.personal);
  registerPersonalStatsView.addHandlerToggle();
  mealStatsView.update(model.state);
};

const controlLoadStatsGraphs = async function (graphType, color) {
  try {
    graphStatsView.renderSpinner();
    await model.loadStatsGraph(graphType, color);
  } catch (err) {
    graphStatsView.renderError(err);
  }
};

const initMealsDashboardView = function () {
  calendarView = new CalendarView();
  addMealsView = new AddMealsView();
  graphGeneralView = new GraphGeneralView();
  registerPersonalStatsView = new RegisterPersonalStatsView();
  mealStatsView = new MealStatsView();
  graphStatsView = new GraphStatsView();
};

const initFncMealsDashboardView = function () {
  calendarView.addHandlerRender(controlCalendarRender);
  addMealsView.addHandlerMealTime(controlMealTimeRender);
  addMealsView.addHandlerDeleteMeals(controlDeleteMeals);
  addMealsView.addHandlerRender(controlAddMeals);
  graphGeneralView.addHandlerRender(controlLoadGeneralGraphs);
  graphGeneralView.addHandlerModifyGraph(controlLoadGeneralGraphs);
  mealStatsView.addHandlerRender(controlRenderStats);
  registerPersonalStatsView.addHandlerRender(controlRenderCurrentGoal);
  registerPersonalStatsView.addHandlerRegister(controlRegisterPersonalStats);
  graphStatsView.addHandlerRender(controlLoadStatsGraphs);
  graphStatsView.addHandlerModifyGraph(controlLoadStatsGraphs);
};

// -----------------------------
// Sidebar functionality

const resetUrl = function (view) {
  history.pushState({ view: view }, '', view);
  const popStateEvent = new PopStateEvent('popstate', {
    state: { view: view },
  });
  dispatchEvent(popStateEvent);
};

const renderBefore = function (viewClass, data = '') {
  viewClass.render(data);
};

const controlMenu = function (view = 'MealsDashboardView') {
  sidebarView.render(view);

  if (view?.includes('RecipesView')) {
    resetUrl(view);
    initRecipesView();
    initFncRecipesView();
    renderBefore(bookmarksView, model.state.bookmarks);
  } else {
    initMealsDashboardView();
    initFncMealsDashboardView();
    resetUrl(view);
  }
};
controlMenu(window.location.toString());
sidebarView.addHandlerRender(controlMenu);
sidebarView.addHandlerMenuOpen();
//http://localhost:1234/RecipesView#680975

// const graphGeneral = document.querySelector('.graph--general');
// const registerMealStats = document.querySelector('.register-personal-stats');
// graphGeneral.addEventListener('click', function (e) {
//   if (!e.target.closest('.graph--general')) return;
//   registerMealStats.classList.toggle('display-none');
//   graphGeneral.classList.toggle('graph--general--active');
// });
