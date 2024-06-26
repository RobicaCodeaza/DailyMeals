// import icons from '../img/icons.svg'; //Parcel 1
import icons from 'url:../../img/icons.svg'; //Parcel 2
import fracty from '../../../node_modules/fracty';
import View from '../views/View';

export default class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find the recipe.Please try again!';

  _message = '';

  addHandlerRender(handler) {
    // console.log('Entered handler Render');
    ['hashchange', 'load', 'popstate'].forEach(e =>
      window.addEventListener(e, function (e) {
        handler();
      })
    );
  }
  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (+updateTo > 0) handler(+updateTo);
    });
  }
  addHandlerAddBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--bookmark');
      if (!btn) return;
      handler();
    });
  }
  addHandlerAddMeal(handler) {
    // this._parentElement.addEventListener('click', function (e) {
    //   const submit = e.target.closest('.btn--form');
    //   if (!submit) return;
    //   e.preventDefault();
    //   const mealTime = document.querySelector('select').value;
    //   handler(mealTime);
    // });
    document
      .querySelector('#form-meal-time')
      .addEventListener('submit', function (e) {
        e.preventDefault();
        const mealTime = document.querySelector('select').value;
        handler(mealTime);
      });
  }

  _generateMarkup() {
    return `   
    <div class="recipe__header">

      <figure class="recipe__fig">
        <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
        
      </figure>
    
      <div class="recipe__details">
        <h1 class="recipe__title">
          <span>${this._data.title}</span>
        </h1>
        <div class="recipe__info">
        
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            this._data.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            this._data.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button data-update-to ="${this._data.servings - 1}"
            class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button  data-update-to ="${this._data.servings + 1}"
            class="btn--tiny btn--update-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>
        <div class="user-box">

          <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${icons}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }">
              </use>
            </svg>
          </button>
        </div>

        <div class="user-box">
          <form action="#" id="form-meal-time">
            <select
              name="select-meal-time"
              id="select-meal-time"
              required
            >
              <option value="">Choose meal time</option>
              <option value="breakfast" ${
                this._data.mealTime === 'breakfast' ? 'selected' : ''
              }>Breakfast</option>
              <option value="lunch" ${
                this._data.mealTime === 'lunch' ? 'selected' : ''
              }>Lunch</option>
              <option value="dinner" ${
                this._data.mealTime === 'dinner' ? 'selected' : ''
              }>Dinner</option>
              <option value="snack" ${
                this._data.mealTime === 'snack' ? 'selected' : ''
              }>Snack</option>
            </select>
            <button type="submit" class="btn--form">Add meal</button>
          </form>
        </div>
      </div>
    </div>

      <div class="recipe__cooking">
      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
        ${this._data.ingredients
          .map(ing => {
            return `
        <li class="recipe__ingredient">
          <svg class="recipe__icon">
            <use href="${icons}#icon-check"></use>
          </svg>
          <div class="recipe__quantity">${
            ing.amount
              ? fracty(Number(ing.amount).toFixed(1))
              : ing.quantity
              ? fracty(Number(ing.quantity).toFixed(1))
              : ''
          }</div>
          <div class="recipe__description">
            <span class="recipe__unit">${ing.unit}</span>
            ${ing.name ? ing.name : ing.description}
          </div>
        </li>`;
          })
          .join('')}
      

        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            this._data.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${this._data.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    </div>
    `;
  }
}
