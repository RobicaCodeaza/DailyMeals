import { async } from 'regenerator-runtime'; // fOR PROMISE POLYFILLING
import {
  RES_PER_PAGE,
  KEY_GET,
  API_URL_GET,
  API_URL_UPLOAD,
  KEY_UPLOAD,
} from './config';
// import { getJSON, sendJSON } from './helpers';
import { AJAX } from './helpers';
import * as datedreamer from 'datedreamer';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
};
const reconstructIngredients = function (ingredient) {
  return {
    id: +ingredient.id,
    amount: +ingredient.measures.us.amount,
    unit: ingredient.measures.us.unitLong,
    name: ingredient.name,
    text: ingredient.original,
  };
};
const createRecipeObject = function (data) {
  let recipe;
  if (data.data) {
    console.log('Entered data');
    recipe = data.data.recipe;
  } else {
    recipe = data;
  }
  console.log(recipe);
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.sourceName || recipe.publisher,
    sourceUrl: recipe.sourceUrl || recipe.source_url,
    image: recipe.image || recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.readyInMinutes || recipe.cooking_time,
    ingredients:
      recipe.ingredients ||
      recipe.extendedIngredients?.map(ingredient =>
        reconstructIngredients(ingredient)
      ),
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await Promise.any([
      AJAX(
        `${API_URL_GET}/recipes/${id}/information?apiKey=${KEY_GET}&includeNutrition=false`
      ),
      AJAX(`${API_URL_UPLOAD}${id}?key=${KEY_UPLOAD}`),
    ]);
    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some(b => b.id === id)) {
      state.recipe.bookmarked = true;
    } else state.recipe.bookmarked = false;
    // console.log(state.recipe);
  } catch (err) {
    // Temporary error handling
    console.log(`${err} `);
    // ERROR HANDLING
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await AJAX(
      `${API_URL_GET}/recipes/complexSearch?query=${query}&apiKey=${KEY_GET}&number=25`
    );

    const dataUpload = await AJAX(
      `${API_URL_UPLOAD}?search=${query}&key=${KEY_UPLOAD}`
    );

    const uploadedResults = dataUpload.data.recipes.map(rec => {
      if (rec.key)
        return {
          id: rec.id,
          title: rec.title,
          publisher: rec.sourceName || rec.publisher,
          image: rec.image,
          ...(rec.key && { key: rec.key }),
        };
    });
    const dataResults = data.results.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.sourceName,
        image: rec.image,
      };
    });
    state.search.results = [...uploadedResults, ...dataResults];

    state.search.page = 1;
  } catch (err) {
    console.log(`${err} `);
    // ERROR HANDLING
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; //0;
  const end = page * state.search.resultsPerPage; //10;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.amount = ing.amount * (newServings / state.recipe.servings); // newQt = oldQt * newServings/Old Serving 2* 8/4 = 4
  });
  state.recipe.servings = newServings;
};
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBookmark = function (recipe) {
  // Add bookmark
  state.recipe.bookmarked = true;
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  // if (recipe.id === state.recipe.id)

  persistBookmarks();
};

export const deleteBookmark = function (id) {
  console.log(typeof id);
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);

  // if (id === state.recipe.id)
  state.recipe.bookmarked = false;

  persistBookmarks();
};

const initiate = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
initiate();

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => {
        return entry[0].startsWith('ingredient') && entry[1] !== '';
      })
      .map(ing => {
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format!'
          );
        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const data = await AJAX(`${API_URL_UPLOAD}?key=${KEY_UPLOAD}`, recipe);
    state.recipe = createRecipeObject(data);
    console.log(state.recipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
export const loadCalendar = function (element) {
  state.datedreamer = new datedreamer.calendarToggle({
    element: `${element}`,
    format: 'MM/DD/YYYY',
    // darkMode: true,
    theme: 'lite-purple',
    // custom styles here
    styles: `
     button{
     color:#003554,
    
     }
     .datedreamer-calendar-toggle{
      width:25rem;
     }
    `,

    onChange: e => {
      console.log(new Date(e.detail).getTime());
    },
  });
};

export const resetCalendar = function () {
  state.datedreamer && (state.datedreamer = null);
};
