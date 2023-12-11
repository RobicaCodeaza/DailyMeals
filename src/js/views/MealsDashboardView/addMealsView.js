// import { values } from 'core-js/core/array';
import View from '../View';
// import timeMeals from './TimeMealsView';

class AddMealsView extends View {
  _parentElement = document.querySelector('.add-meals__table__body');
  _btns = document.querySelectorAll('.btn--add');
  addHandlerMealTime(handler) {
    this._parentElement.addEventListener('click', function (e) {
      if (!e.target.closest('.btn--add')) return;
      const mealTime = e.target.closest('.btn--add').id;

      handler(mealTime);
    });
  }
  addHandlerDeleteMeals(handler) {
    this._parentElement.addEventListener('click', function (e) {
      if (!e.target.closest('.btn--delete')) return;
      handler(
        e.target.closest('.btn--delete').id,
        e.target.closest('.btn--delete').dataset.mealtime
      );
    });
  }

  addHandlerRender(handler) {
    ['popstate'].forEach(e =>
      window.addEventListener(e, function (event) {
        handler();
      })
    );
  }
  _generateMarkup() {
    return `
              <tr class = 'breakfast'>
                <th>Breakfast</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button class="btn--add" id="breakfast">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#000000"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
              ${
                this._data['breakfast']?.length > 0
                  ? this._data['breakfast']
                      .map(meal => {
                        return `
                  <tr>
                    <td>${meal.title}</td>
                    <td>${meal.weight}g</td>
                    <td>${meal.calories}kcal</td>
                    <td>${meal.proteins}g</td>
                    <td>${meal.carbs}g</td>
                    <td>${meal.fats}g</td>
                    <td>
                      <button class="btn--delete" id="${meal.id}" data-mealtime = "${meal.mealTime}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                      </button>
                    </td>
                </tr>  `;
                      })
                      .join('')
                  : ''
              }

           
              <tr class="lunch">
                <th>Lunch</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button class="btn--add" id="lunch">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#000000"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
              ${
                this._data['lunch']?.length > 0
                  ? this._data['lunch']
                      .map(meal => {
                        return `
                  <tr>
                    <td>${meal.title}</td>
                    <td>${meal.weight}g</td>
                    <td>${meal.calories}kcal</td>
                    <td>${meal.proteins}g</td>
                    <td>${meal.carbs}g</td>
                    <td>${meal.fats}g</td>
                    <td>
                      <button class="btn--delete" id="${meal.id}" data-mealtime = "${meal.mealTime}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                      </button>
                    </td>
                </tr>  `;
                      })
                      .join('')
                  : ''
              }


        
              <tr class="dinner">
                <th>Dinner</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button class="btn--add" id="dinner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#000000"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
              ${
                this._data['dinner']?.length > 0
                  ? this._data['dinner']
                      .map(meal => {
                        return `
                  <tr>
                    <td>${meal.title}</td>
                    <td>${meal.weight}g</td>
                    <td>${meal.calories}kcal</td>
                    <td>${meal.proteins}g</td>
                    <td>${meal.carbs}g</td>
                    <td>${meal.fats}g</td>
                    <td>
                      <button class="btn--delete" id="${meal.id}" data-mealtime = "${meal.mealTime}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                      </button>
                    </td>
                </tr>  `;
                      })
                      .join('')
                  : ''
              }
         
              <tr class="snack">
                <th>Snack</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button class="btn--add" id="snack">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#000000"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
              ${
                this._data['snack']?.length > 0
                  ? this._data['snack']
                      .map(meal => {
                        return `
                  <tr>
                    <td>${meal.title}</td>
                    <td>${meal.weight}g</td>
                    <td>${meal.calories}kcal</td>
                    <td>${meal.proteins}g</td>
                    <td>${meal.carbs}g</td>
                    <td>${meal.fats}g</td>
                    <td>
                      <button class="btn--delete" id="${meal.id}" data-mealtime = "${meal.mealTime}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"></path></svg>
                      </button>
                    </td>
                </tr>
                  `;
                      })
                      .join('')
                  : ''
              }
    
    
    `;
  }
}
export default AddMealsView;
