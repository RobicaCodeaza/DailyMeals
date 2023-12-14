import View from '../views/View';

export default class MealStatsView extends View {
  _parentElement = document.querySelector('.meal-stats');

  addHandlerRender(handler) {
    window.addEventListener('popstate', handler);
  }

  _generateMarkup() {
    return `
          <div class="meal-stats__stat meal-stats__stat--active" id='totalCalories' data-color='#ff5a00'>
            <div class="meal-stats__stat__icon-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-calories"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                />
              </svg>
            </div>
            <div class="meal-stats__stat__total">
              <span class="meal-stats__stat__total__value">${
                this._data.mealDaily.totalCalories
                  ? this._data.mealDaily.totalCalories
                  : '0'
              } kcal</span>
              <span class="meal-stats__stat__total__name">Calories</span>
            </div>
          </div>
          <div class="meal-stats__stat" id="currentWeight" data-color='#8e71f5'>
            <div class="meal-stats__stat__icon-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-weight"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
                />
              </svg>
            </div>
            <div class="meal-stats__stat__total">
              <span class="meal-stats__stat__total__value">${
                this._data.personal.currentWeight
                  ? this._data.personal.currentWeight
                  : '0'
              } kg</span>
              <span class="meal-stats__stat__total__name">Weight</span>
            </div>
          </div>
          <div class="meal-stats__stat" id="currentBodyFat" data-color='#ffe808'>
            <div class="meal-stats__stat__icon-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000000"
                viewBox="0 0 256 256"
                class="icon-body-fat"
              >
                <path
                  d="M205.66,61.64l-144,144a8,8,0,0,1-11.32-11.32l144-144a8,8,0,0,1,11.32,11.31ZM50.54,101.44a36,36,0,0,1,50.92-50.91h0a36,36,0,0,1-50.92,50.91ZM56,76A20,20,0,1,0,90.14,61.84h0A20,20,0,0,0,56,76ZM216,180a36,36,0,1,1-10.54-25.46h0A35.76,35.76,0,0,1,216,180Zm-16,0a20,20,0,1,0-5.86,14.14A19.87,19.87,0,0,0,200,180Z"
                ></path>
              </svg>
            </div>
            <div class="meal-stats__stat__total">
              <span class="meal-stats__stat__total__value">${
                this._data.personal.currentBodyFat
                  ? this._data.personal.currentBodyFat
                  : '0'
              }%</span>
              <span class="meal-stats__stat__total__name">Body fat</span>
            </div>
          </div>
          <div class="meal-stats__stat" id="totalProteins" data-color='#51cf66'>
            <div class="meal-stats__stat__icon-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000000"
                viewBox="0 0 256 256"
                class="icon-proteins"
              >
                <path
                  d="M186.66,59.56C168.47,32.29,146.54,16,128,16S87.53,32.29,69.34,59.56C50.7,87.54,40,121.23,40,152a88,88,0,0,0,176,0C216,121.23,205.3,87.54,186.66,59.56ZM128,224a72.08,72.08,0,0,1-72-72c0-27.69,9.72-58.15,26.66-83.56C97.19,46.64,115.41,32,128,32c9.5,0,22.2,8.33,34.1,21.78L122,98.67a8,8,0,0,0,4,13.09l24.6,6.15-6.5,32.52a8,8,0,0,0,6.27,9.41A7.77,7.77,0,0,0,152,160a8,8,0,0,0,7.83-6.43l8-40a8,8,0,0,0-5.9-9.33l-19.16-4.79L172.1,66.6c.42.61.83,1.22,1.24,1.84C190.28,93.85,200,124.31,200,152A72.08,72.08,0,0,1,128,224Z"
                ></path>
              </svg>
            </div>
            <div class="meal-stats__stat__total">
              <span class="meal-stats__stat__total__value">${
                this._data.mealDaily.totalProteins
                  ? this._data.mealDaily.totalProteins
                  : '0'
              }g</span>
              <span class="meal-stats__stat__total__name">Protein</span>
            </div>
          </div>
          <div class="meal-stats__stat" id="totalCarbs" data-color='#94d82d'>
            <div class="meal-stats__stat__icon-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000000"
                viewBox="0 0 256 256"
                class="icon-carbs"
              >
                <path
                  d="M224,104h-8.37a88,88,0,0,0-175.26,0H32a8,8,0,0,0-8,8,104.35,104.35,0,0,0,56,92.28V208a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16v-3.72A104.35,104.35,0,0,0,232,112,8,8,0,0,0,224,104Zm-24.46,0H148.12a71.84,71.84,0,0,1,41.27-29.57A71.45,71.45,0,0,1,199.54,104ZM173.48,56.23q2.75,2.25,5.27,4.75a87.92,87.92,0,0,0-49.15,43H100.1A72.26,72.26,0,0,1,168,56C169.83,56,171.66,56.09,173.48,56.23ZM128,40a71.87,71.87,0,0,1,19,2.57A88.36,88.36,0,0,0,83.33,104H56.46A72.08,72.08,0,0,1,128,40Zm36.66,152A8,8,0,0,0,160,199.3V208H96v-8.7A8,8,0,0,0,91.34,192a88.29,88.29,0,0,1-51-72H215.63A88.29,88.29,0,0,1,164.66,192Z"
                ></path>
              </svg>
            </div>
            <div class="meal-stats__stat__total">
              <span class="meal-stats__stat__total__value">${
                this._data.mealDaily.totalCarbs
                  ? this._data.mealDaily.totalCarbs
                  : '0'
              }g</span>
              <span class="meal-stats__stat__total__name">Carbs</span>
            </div>
          </div>
          <div class="meal-stats__stat" id="totalFats" data-color='#ffd43b'>
            <div class="meal-stats__stat__icon-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="#000000"
                viewBox="0 0 256 256"
                class="icon-fats"
              >
                <path
                  d="M164.49,163.51a12,12,0,1,1-17,0A12,12,0,0,1,164.49,163.51Zm-81-8a12,12,0,1,0,17,0A12,12,0,0,0,83.51,155.51Zm9-39a12,12,0,1,0-17,0A12,12,0,0,0,92.49,116.49Zm48-1a12,12,0,1,0,0,17A12,12,0,0,0,140.49,115.51ZM232,128A104,104,0,1,1,128,24a8,8,0,0,1,8,8,40,40,0,0,0,40,40,8,8,0,0,1,8,8,40,40,0,0,0,40,40A8,8,0,0,1,232,128Zm-16.31,7.39A56.13,56.13,0,0,1,168.5,87.5a56.13,56.13,0,0,1-47.89-47.19,88,88,0,1,0,95.08,95.08Z"
                ></path>
              </svg>
            </div>
            <div class="meal-stats__stat__total">
              <span class="meal-stats__stat__total__value">${
                this._data.mealDaily.totalFats
                  ? this._data.mealDaily.totalFats
                  : '0'
              }g</span>
              <span class="meal-stats__stat__total__name">Fats</span>
            </div>
          </div>
    `;
  }
}
