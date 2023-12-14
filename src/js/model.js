'use strict';
import { async } from 'regenerator-runtime'; // fOR PROMISE POLYFILLING
// import * as QuickChart from '../../node_modules/quickchart-js';
const qc = new QuickChart();

import {
  RES_PER_PAGE,
  setRES_PER_PAGE,
  KEY_GET,
  API_URL_GET,
  API_URL_UPLOAD,
  KEY_UPLOAD,
} from './config';

import { AJAX } from './helpers';

import dayjs from 'dayjs';

const formatDayTimeStamp = function (date) {
  if (date) {
    return +new Date(
      new Date(date).getFullYear(),
      new Date(date).getMonth(),
      new Date(date).getDate()
    );
  } else
    return +new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    );
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
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.sourceName || recipe.publisher,
    sourceUrl: recipe.sourceUrl || recipe.source_url,
    image: recipe.image || recipe.image_url,
    servings: recipe.servings,
    oldServings: recipe.servings,
    cookingTime: recipe.readyInMinutes || recipe.cooking_time,
    ingredients:
      recipe.ingredients ||
      recipe.extendedIngredients?.map(ingredient =>
        reconstructIngredients(ingredient)
      ),
    ...(recipe.key && { key: recipe.key }),
  };
};
const findNutrient = function (nutrition, nutrient) {
  const nutrientObj = nutrition.nutrients.find(nutr => nutr.name === nutrient);
  return nutrientObj.amount;
};

const createFullNutrientObject = async function (rec) {
  const nutrition = await AJAX(
    `${API_URL_GET}/recipes/${rec.id}/nutritionWidget.json?&apiKey=${KEY_GET}`
  );
  return {
    id: rec.id,
    title: rec.title,
    publisher: rec.sourceName,
    image: rec.image,
    calories:
      findNutrient(nutrition, 'Calories') *
      (rec.servings ? rec.servings / rec.oldServings : 1),
    proteins:
      findNutrient(nutrition, 'Protein') *
      (rec.servings ? rec.servings / rec.oldServings : 1),
    carbs:
      findNutrient(nutrition, 'Carbohydrates') *
      (rec.servings ? rec.servings / rec.oldServings : 1),
    fats:
      findNutrient(nutrition, 'Fat') *
      (rec.servings ? rec.servings / rec.oldServings : 1),
    weight: `${
      nutrition.weightPerServing.amount *
      (rec.servings ? rec.servings / rec.oldServings : 1)
    }`,
  };
};
export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  bookmarks: [],
  mealDaily: {
    day: '',
    meals: {
      breakfast: [],
      lunch: [],
      dinner: [],
      snack: [],
    },
  },
  caloriesStats: [],
  weightStats: [],
  bodyFatStats: [],
  proteinStats: [],
  carbsStats: [],
  fatsStats: [],
  meals: [],
  personal: {
    calCurrentGoal: '',
    currentWeight: '',
    goalWeight: '',
    currentBodyFat: '',
    goalBodyFat: '',
    age: '',
    height: '',
    weekGoal: '',
    activity: '',
    currentWeightEvolution: [],
    currentBodyFatEvolution: [],
  },
  day: formatDayTimeStamp(),
};
//-------------------------------
// Defining Media Queries restrictions
const tabLand = window.matchMedia('(max-width:75em)');
const phone = window.matchMedia('(max-width: 37.5em)');

if (tabLand.matches) {
  state.search.resultsPerPage = 2;
  console.log('tablet land');
}
if (phone.matches) {
  state.search.resultsPerPage = 1;
  console.log('phone media');
}
window.addEventListener('resize', function (e) {
  console.log(tabLand.matches);
  if (tabLand.matches) {
    state.search.resultsPerPage = 2;
  }
  if (phone.matches) state.search.resultsPerPage = 1;

  console.log(RES_PER_PAGE);
});

//-------------------------------
export const loadRecipe = async function (id) {
  try {
    const data = await Promise.any([
      AJAX(`${API_URL_GET}/recipes/${+id}/information?apiKey=${KEY_GET}`),
      AJAX(`${API_URL_UPLOAD}${+id}?key=${KEY_UPLOAD}`),
    ]);
    state.recipe = createRecipeObject(data);
    if (state.bookmarks.some(b => b.id === id)) {
      state.recipe.bookmarked = true;
    } else state.recipe.bookmarked = false;
    // console.log(state.recipe);
    state.mealTime && (state.recipe.mealTime = state.mealTime);
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
      `${API_URL_GET}/recipes/complexSearch?query=${query}&apiKey=${KEY_GET}&number=10`
    );
    const dataUpload = await AJAX(
      `${API_URL_UPLOAD}?search=${query}&key=${KEY_UPLOAD}`
    );
    const uploadedResults = dataUpload?.data.recipes.filter(rec => {
      if (rec.key) {
        return {
          id: rec.id,
          title: rec.title,
          publisher: rec.sourceName || rec.publisher,
          image: rec.image,
          ...(rec.key && { key: rec.key }),
        };
      }
    });

    let dataResults = data.results.map(rec => createFullNutrientObject(rec));
    dataResults = await Promise.all(dataResults);
    state.search.results = [...uploadedResults, ...dataResults];
    // console.log(state.search.results);

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
const persistMeals = function () {
  localStorage.setItem('meals', JSON.stringify(state.meals));
};
const persistPersonal = function () {
  localStorage.setItem('personal', JSON.stringify(state.personal));
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

export const deleteMeal = function (mealId, mealTime) {
  // Finding the day and the index of it for which we want to delete a meal
  const indexMealDaily = state.meals.findIndex(
    mealDaily => mealDaily.day === state.day
  );
  // Finding the meals for the period of time(breakfast,lunch...)
  const timeMeals = state.meals.find(mealDaily => mealDaily.day === state.day);
  // Finding our meal based on recipe id
  const indexOfMeal = timeMeals.meals[mealTime].findIndex(
    meal => meal.id === +mealId
  );
  // console.log(indexOfMeal);
  // Deleting the meal from meals[period of time]
  timeMeals.meals[mealTime].splice(indexOfMeal, 1);
  // Deleting from state too
  state.meals.splice(indexMealDaily, 1);
  // Updating the state for meals of that day selected from calendar
  state.mealDaily = timeMeals;
  state.meals.push(state.mealDaily);
  persistMeals();
};

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();
const clearMeals = function () {
  localStorage.clear('meals');
};
// clearMeals();
const clearPersonal = function () {
  localStorage.clear('personal');
};
// clearPersonal();

const initiate = function () {
  const storageBookmarks = localStorage.getItem('bookmarks');
  if (storageBookmarks) state.bookmarks = JSON.parse(storageBookmarks);

  const storageMeals = localStorage.getItem('meals');
  if (storageMeals) state.meals = JSON.parse(storageMeals);

  const storagePersonal = localStorage.getItem('personal');
  if (storagePersonal) state.personal = JSON.parse(storagePersonal);
  // if (state.meals.find(meal => (meal.day = state.day)))
  //   state.mealDaily = state.meals.find(meal => (meal.day = state.day));
};
initiate();

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

export const dayjsFormat = function () {
  return dayjs(new Date(state.day)).format('MM/DD/YYYY');
};
export const setDay = function (day) {
  state.day = +new Date(day);
};

export const loadCalendar = function (element) {};

export const mealTimeSet = function (mealTime = '') {
  state.mealTime = mealTime;
};
export const findMealDaily = function () {
  if (!state.meals.find(meal => meal.day === state.day)) {
    state.mealDaily = {
      day: '',
      meals: { breakfast: [], lunch: [], dinner: [], snack: [] },
    };
    state.mealDaily.added = false;
  } else {
    state.mealDaily = state.meals.find(meal => meal.day === state.day);
  }
};

export const addMeal = async function () {
  try {
    console.log('Entered Added');
    const fullNutrientRecipe = await createFullNutrientObject(state.recipe);
    fullNutrientRecipe.mealTime = state.mealTime;
    if (!state.mealDaily.added) {
      state.mealDaily.day = state.day;
      state.mealDaily.meals[state.mealTime].push(fullNutrientRecipe);
      state.mealDaily.added = true;
      state.meals.push(state.mealDaily);
    } else {
      state.mealDaily.meals[state.mealTime].push(fullNutrientRecipe);
      const index = state.meals.findIndex(meal => meal.day === state.day);
      state.meals[index] = state.mealDaily;
    }
    persistMeals();
  } catch (err) {
    alert(err);
  }
};

const calcCaloriesPerMealTime = function (mealDaily = state.mealDaily) {
  const allMealsDaily = Object.values(mealDaily.meals);
  const totals = allMealsDaily.map(mealTime =>
    mealTime.reduce((acc, meal) => {
      return acc + +meal.calories.toFixed(0);
    }, 0)
  );
  return totals;
};

const calcAvgCaloriesPerMealtime = function () {
  const allMealsAllDays = state.meals.map(mealDaily =>
    calcCaloriesPerMealTime(mealDaily)
  );
  let calories = [0, 0, 0, 0];
  calories = calories.map((_, index) => {
    const avgCaloriesPerMealType = allMealsAllDays
      .filter(meals => meals[index] > 0)
      .reduce((acc, meal, _, allMeals) => {
        return acc + meal[index] / allMeals.length;
      }, 0);
    return avgCaloriesPerMealType.toFixed(0);
  });
  return calories;
};

const calcNutrientsPerDay = function (
  nutrient = 'proteins',
  mealDaily = state.mealDaily
) {
  const allMealsDaily = Object.values(mealDaily.meals);
  const totals = allMealsDaily.reduce((acc, mealTime) => {
    return (
      acc +
      mealTime.reduce((accumulator, meal) => {
        return accumulator + meal[nutrient];
      }, 0)
    );
  }, 0);
  return totals.toFixed(0);
};

const calcAvgNutrientsPerDay = function (nutrient) {
  const numberOfMealsRegistered = state.meals.reduce((acc, mealDaily) => {
    return (
      acc +
      Object.values(mealDaily.meals).reduce((accumulator, mealTime) => {
        if (mealTime.length > 0) {
          return accumulator + mealTime.length;
        } else {
          return accumulator + 0;
        }
      }, 0)
    );
  }, 0);
  const totals = state.meals.reduce((acc, mealDaily) => {
    return (
      acc + calcNutrientsPerDay(nutrient, mealDaily) / numberOfMealsRegistered
    );
  }, 0);
  return totals.toFixed();
};

export const calcMealDailyStats = function () {
  state.mealDaily.totalCalories = calcCaloriesPerMealTime().reduce(
    (calories, calPerMealTime) => calories + calPerMealTime,
    0
  );
  state.mealDaily.totalProteins = calcNutrientsPerDay('proteins');
  state.mealDaily.totalCarbs = calcNutrientsPerDay('carbs');
  state.mealDaily.totalFats = calcNutrientsPerDay('fats');

  const indexMealDaily = state.meals.findIndex(
    mealDaily => mealDaily.day === state.mealDaily.day
  );

  // Deleting from state too
  if (indexMealDaily >= 0) {
    console.log('calc Meal Daily STATS');
    state.meals.splice(indexMealDaily, 1);
    state.meals.push(state.mealDaily);
    persistMeals();
  }
};
// calcMealDailyStats();

const calcCurrentGoal = function (data) {
  // Using Katch-McARDLE Formula
  const kcalPerKg = 7700;
  const maintainingCal =
    370 +
    21.6 * (1 - +data.currentBodyFat / 100) * +data.currentWeight +
    +(Number.parseFloat(data.activity)
      ? (Number.parseFloat(data.activity) * kcalPerKg) / 7
      : 0);
  const currentGoalCal =
    maintainingCal +
    (Number.parseFloat(data.weekGoal)
      ? (Number.parseFloat(data.weekGoal) * kcalPerKg) / 7
      : 0);
  return currentGoalCal.toFixed(0);
};
export const findPersonalStatsForDay = function () {
  const indexOfWeight = state.personal.currentWeightEvolution.findIndex(
    currentWeight => currentWeight.day === state.day
  );
  if (indexOfWeight != -1)
    state.personal.currentWeight =
      state.personal.currentWeightEvolution[indexOfWeight].currentWeight;
  else
    state.personal.currentWeight = state.personal.currentWeightEvolution
      .sort(sortDesc)
      .find(weight => weight.day < state.day)?.currentWeight;

  const indexOfBodyFat = state.personal.currentBodyFatEvolution.findIndex(
    currentBodyFat => currentBodyFat.day === state.day
  );

  if (indexOfBodyFat != -1)
    state.personal.currentBodyFat =
      state.personal.currentBodyFatEvolution[indexOfBodyFat].currentBodyFat;
  else
    state.personal.currentBodyFat = state.personal.currentBodyFatEvolution
      .sort(sortDesc)
      .find(bodyFat => bodyFat.day < state.day)?.currentBodyFat;

  persistPersonal();
};
export const addPersonalStats = function (data) {
  state.personal.calCurrentGoal = calcCurrentGoal(data);
  state.personal.currentWeight = data.currentWeight;
  state.personal.goalWeight = data.goalWeight;
  state.personal.currentBodyFat = data.currentBodyFat;
  state.personal.goalBodyFat = data.goalBodyFat;
  state.personal.age = data.age;
  state.personal.height = data.height;
  state.personal.weekGoal = data.weekGoal;
  state.personal.activity = data.activity;

  // Finding existing weight
  const indexOfWeight = state.personal.currentWeightEvolution.findIndex(
    currentWeight => currentWeight.day === state.day
  );
  console.log(indexOfWeight);
  const currentWeightObj = {
    day: state.day,
    currentWeight: data.currentWeight,
  };
  if (indexOfWeight != -1) {
    state.personal.currentWeightEvolution.splice(indexOfWeight, 1);
  }
  state.personal.currentWeightEvolution.push(currentWeightObj);

  // Finding existing bodyfat
  const indexOfBodyFat = state.personal.currentBodyFatEvolution.findIndex(
    currentBodyFat => currentBodyFat.day === state.day
  );
  const currentBodyFatObj = {
    day: state.day,
    currentBodyFat: data.currentBodyFat,
  };
  if (indexOfBodyFat != -1)
    state.personal.currentBodyFatEvolution.splice(indexOfBodyFat, 1);
  state.personal.currentBodyFatEvolution.push(currentBodyFatObj);

  console.log(state.personal);
  persistPersonal();
};

const loadImage = async function (el, imgPath) {
  return new Promise(function (resolve, reject) {
    el.src = imgPath;
    el.addEventListener('load', function () {
      resolve(el);
    });
    el.addEventListener('error', function () {
      reject(new Error('Img not found'));
    });
  });
};

const createGraphGeneral = function (
  type,
  datasets,
  title,
  backgroundColors,
  labels,
  cutoutPercentage
) {
  qc.setConfig({
    type: type,
    data: {
      datasets: [
        {
          fill: true,
          spanGaps: false,
          lineTension: 0.4,
          pointRadius: 3,
          pointHoverRadius: 3,
          pointStyle: 'circle',
          borderDash: [0, 0],
          barPercentage: 0.8,
          categoryPercentage: 0.8,
          data: datasets,
          // label: 'Dataset 1',
          borderColor: '#0b2866',
          backgroundColor: backgroundColors,
          borderWidth: 5,
          hidden: false,
        },
      ],
      labels: labels,
    },
    options: {
      title: {
        display: true,
        position: 'top',
        fontSize: 16,
        fontFamily: 'Doris',
        fontColor: '#e8f0ff',
        fontStyle: 'bold',
        padding: 10,
        lineHeight: 1.2,
        text: `${title}`,
      },
      layout: {
        padding: {
          left: 20,
          top: 10,
          bottom: 10,
          right: 0,
        },
      },
      legend: {
        display: true,
        position: 'left',
        align: 'center',
        fullWidth: true,
        reverse: false,
        labels: {
          fontSize: 16,
          fontFamily: 'Doris',
          fontColor: '#e8f0ff',
          fontStyle: 'bold',
          padding: 15,
        },
      },
      plugins: {
        datalabels: {
          display: true,
          align: 'center',
          anchor: 'center',
          backgroundColor: '#1651cc',
          borderColor: '#fbdb89',
          borderRadius: 15,
          borderWidth: 2,
          padding: 10,
          color: '#e8f0ff',
          font: {
            family: 'Doris',
            size: 14,
            style: 'italic',
          },
        },
      },
      cutoutPercentage: cutoutPercentage,
      rotation: -1.5707963267948966,
      circumference: 6.283185307179586,
      startAngle: -1.5707963267948966,
    },
  });
  qc.setWidth(615).setHeight(305).setBackgroundColor('#0b2866');
};

export const loadGeneralGraph = async function (graphType) {
  try {
    if (graphType.includes('general')) {
      if (graphType.includes('calories')) {
        let datasets, title;
        const type = 'doughnut';
        const cutoutPercentage = 50;
        const backgroundColors = ['#FFEBAF', '#9CCC65', '#FFB6C1', '#FFD700'];
        const labels = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
        if (graphType.includes('day')) {
          title = 'Calories(kcal) - Current day';
          datasets = calcCaloriesPerMealTime();
        } else {
          title = 'Calories(kcal) - Average';
          datasets = calcAvgCaloriesPerMealtime();
        }
        createGraphGeneral(
          type,
          datasets,
          title,
          backgroundColors,
          labels,
          cutoutPercentage
        );
      }
      if (graphType.includes('nutrients')) {
        let datasets, title;
        const type = 'pie';
        const cutoutPercentage = 0;
        const backgroundColors = ['#51cf66', '#94d82d', '#ffe808'];
        const labels = ['Proteins', 'Carbs', 'Fats'];
        if (graphType.includes('day')) {
          title = 'Nutrients(g) - Current day';
          datasets = [
            calcNutrientsPerDay('proteins'),
            calcNutrientsPerDay('carbs'),
            calcNutrientsPerDay('fats'),
          ];
        } else {
          title = 'Nutrients(g) - Average';
          datasets = [
            calcAvgNutrientsPerDay('proteins'),
            calcAvgNutrientsPerDay('carbs'),
            calcAvgNutrientsPerDay('fats'),
          ];
        }
        createGraphGeneral(
          type,
          datasets,
          title,
          backgroundColors,
          labels,
          cutoutPercentage
        );
      }
    }
    const url = await qc.getUrl();
    const img = document.querySelector('#img-graph-general-splits');
    await loadImage(img, url);
  } catch (err) {
    throw err;
  }
};

const createGraphStats = function (
  dataset,
  dateSeries,
  title,
  targetSeries = undefined,
  datasetColor = '#ff5a00'
) {
  qc.setConfig({
    type: 'line',
    data: {
      datasets: [
        {
          label: `${title}/day`,
          data: dataset,
          fill: false,
          borderColor: datasetColor,
          spanGaps: false,
          lineTension: 0.4,
          pointRadius: 7,
          pointHoverRadius: 10,
          pointStyle: 'circle',
          borderDash: [0, 0],
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          type: 'line',
          backgroundColor: '#fbdb89',
          borderWidth: 3,
          hidden: false,
        },
        {
          label: targetSeries ? 'Current Goal' : '',
          data: targetSeries ? targetSeries : '',
          fill: false,
          borderColor: targetSeries ? '#fbdb89' : '#0b2866',
          lineTension: 0,
          pointRadius: 0,
          pointHoverRadius: 0,
          pointStyle: 'circle',
          borderDash: [20, 20],
          categoryPercentage: 0.8,
          type: 'line',
          borderWidth: 2,
          hidden: targetSeries ? false : true,
          yAxisID: 'Y1',
        },
      ],
      labels: dateSeries,
    },
    options: {
      title: {
        display: true,
        position: 'top',
        fontSize: 16,
        fontFamily: 'doris',
        fontColor: '#e8f0ff',
        fontStyle: 'bold',
        padding: 0,
        lineHeight: 1,
        text: title,
      },
      layout: {
        padding: {
          left: 25,
          right: 25,
          bottom: 25,
          top: 25,
        },
      },
      legend: {
        display: true,
        position: 'top',
        align: 'center',
        fullWidth: true,
        reverse: false,
        labels: {
          fontSize: 13,
          fontFamily: 'doris',
          fontColor: '#bbd1ff',
          fontStyle: 'italic',
          padding: 15,
        },
      },
      scales: {
        xAxes: [
          {
            id: 'X1',
            display: true,
            position: 'bottom',
            type: 'time',
            stacked: false,
            offset: true,
            time: {
              unit: 'day',
              stepSize: 4,
              displayFormats: {
                day: 'DD/MM/YYYY',
              },
            },
            distribution: 'series',
            gridLines: {
              display: true,
              color: '#113d99',
              borderDash: [0, 0],
              lineWidth: 2.5,
              drawBorder: true,
              drawOnChartArea: true,
              drawTicks: true,
              tickMarkLength: 10,
              zeroLineWidth: 0,
              zeroLineColor: 'rgba(0, 0, 0, 0.25)',
              zeroLineBorderDash: [1, 1],
            },
            ticks: {
              display: true,
              fontSize: 12,
              fontFamily: 'doris',
              fontColor: '#bbd1ff',
              fontStyle: 'italic',
              padding: 10,
              stepSize: null,
              minRotation: 0,
              maxRotation: 50,
              mirror: false,
              reverse: false,
            },
          },
        ],
        yAxes: [
          {
            id: 'Y1',
            display: true,
            position: 'left',
            type: 'linear',
            stacked: false,
            offset: false,
            time: {
              unit: false,
            },
            distribution: 'linear',
            gridLines: {
              display: true,
              color: '#113d99',
              borderDash: [0, 0],
              lineWidth: 0.5,
              drawBorder: true,
              drawOnChartArea: true,
              drawTicks: true,
              tickMarkLength: 10,
              zeroLineWidth: 1,
              zeroLineColor: 'rgba(0, 0, 0, 0.25)',
              zeroLineBorderDash: [0, 0],
            },
          },
          {
            id: 'Y2',
            display: false,
            position: 'right',
            type: 'linear',
            stacked: false,
            offset: false,
          },
        ],
      },
      plugins: {
        datalabels: {
          display: false,
          align: 'center',
          anchor: 'center',
          backgroundColor: '#eee',
          borderColor: '#ddd',
          borderRadius: 6,
          borderWidth: 1,
          padding: 4,
          color: '#666666',
          font: {
            family: 'sans-serif',
            size: 10,
            style: 'normal',
          },
        },
        datalabelsZAxis: {
          enabled: false,
        },
        googleSheets: {},
        airtable: {},
        tickFormat: '',
      },
      cutoutPercentage: 50,
      rotation: -1.5707963267948966,
      circumference: 6.283185307179586,
      startAngle: -1.5707963267948966,
    },
  });
  qc.setWidth(800).setHeight(265).setBackgroundColor('#0b2866');
};

function transformTitle(word) {
  return word
    .split(/(?=[A-Z])/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1));
}
function sortDesc(a, b) {
  (a, b) => {
    return b.day - a.day;
  };
}
export const loadStatsGraph = async function (
  graphType = 'totalCalories',
  color,
  days = 7
) {
  try {
    const dayStart = state.day - (days - 1) * 1000 * 60 * 60 * 24;
    const title = transformTitle(graphType);
    let targetSeries = '';
    const daysPeriod = Array.from({ length: days }, (arr, currentIndex) => {
      return dayStart + currentIndex * 1000 * 60 * 60 * 24;
    });
    const daysPeriodFormatedForApi = daysPeriod.map(
      day => day + 1000 * 60 * 60 * 24
    );
    let allDays;
    if (graphType.includes('total')) {
      allDays = Array.from(
        { length: days },
        (_, currentIndex) =>
          state.meals.find(
            mealDaily => mealDaily.day === daysPeriod[currentIndex]
          )?.[graphType] ?? 0
      );

      if (graphType.includes('Calories'))
        targetSeries = Array.from(
          { length: days },
          () => state.personal.calCurrentGoal
        );
    }
    if (graphType.includes('current')) {
      allDays = Array.from(
        { length: days },
        (_, currentIndex) =>
          state.personal[`${graphType}Evolution`].find(
            type => type.day === daysPeriod[currentIndex]
          )?.[graphType] ?? 0
      );
      allDays.forEach((day, index, array) => {
        if (day === 0)
          array[index] = array
            .slice(index === 0 ? 0 : index - 1)
            .find(dayValue => dayValue > 0);
        if (array[index] === undefined) {
          state.personal[`${graphType}Evolution`].sort(sortDesc);
          array[index] = state.personal[`${graphType}Evolution`].find(
            type => type?.day < state.day
          )?.[graphType];
        }
      });
      if (graphType.includes('Weight'))
        targetSeries = Array.from(
          { length: days },
          () => state.personal.goalWeight
        );
      if (graphType.includes('BodyFat'))
        targetSeries = Array.from(
          { length: days },
          () => state.personal.goalBodyFat
        );
    }

    createGraphStats(
      allDays,
      daysPeriodFormatedForApi,
      title[1],
      targetSeries,
      color
    );

    const img = document.querySelector('#img-graph-stats');
    const url = await qc.getUrl();
    img ? await loadImage(img, url) : '';
  } catch (err) {
    throw err;
  }
};
