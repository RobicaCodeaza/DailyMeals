import View from '../View';
export default class RegisterMealStatsView extends View {
  _parentElement = document.querySelector('.register-form');
  _btnSet = document.querySelector('#btn-set');
  addHandlerToggle() {
    const btnSet = document.querySelector('#btn-set');
    btnSet?.addEventListener(
      'click',
      function (e) {
        if (!e.target.closest('#btn-set')) return;
        btnSet.classList.toggle('btn--set--active');
        document
          .querySelector('.register-personal-stats')
          .classList.toggle('register-personal-stats--active');
        document
          .querySelectorAll('#hidden')
          .forEach(el => el.classList.toggle('display-none'));
      }.bind(this)
    );
  }
  addHandlerRegister(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArray = [...new FormData(this)];
      const data = Object.fromEntries(dataArray);
      handler(data);
    });
  }
  addHandlerRender(handler) {
    window.addEventListener('popstate', function () {
      handler();
    });
  }
  _generateMarkup() {
    return `
    <span class="current-goal">
    In order to meet your goal you need to eat: <span class="current-goal__accent">${
      this._data.calCurrentGoal
    }kcal/day</span>
    </span>
    <div class="input-box">
      <span class="btn--set" id="btn-set">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path
            d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
          ></path>
        </svg>
      </span>
    </div>
    
    <div class="input-box display-none" id="hidden">
      <label for="currentWeight"
        >Current Weight <strong>(kg)</strong></label
      >
      <input
        type="number"
        name="currentWeight"
        id="currentWeight"
        required
        placeholder="${
          this._data.currentWeight ? this._data.currentWeight : '75'
        }"
      />
    </div>

    <div class="input-box display-none" id="hidden">
      <label for="goalWeight"
        >Weight Goal <strong>(kg)</strong></label
      >
      <input
        type="number"
        name="goalWeight"
        id="goalWeight"
        required
        placeholder="${this._data.goalWeight ? this._data.goalWeight : 70}"
      />
    </div>

    <div class="input-box display-none" id="hidden">
      <label for="currentBodyFat"
        >Current Body Fat <strong>(%)</strong></label
      >
      <input
        type="number"
        name="currentBodyFat"
        id="currentBodyFat"
        required
        placeholder="${
          this._data.currentBodyFat ? this._data.currentBodyFat : 25
        }%"
      />
    </div>

    <div class="input-box display-none" id="hidden">
      <label for="goalBodyFat">
        Body Fat Goal<strong>(%)</strong></label
      >
      <input
        type="number"
        name="goalBodyFat"
        id="goalBodyFat"
        required
        placeholder="${this._data.goalBodyFat ? this._data.goalBodyFat : 12}"
      />
    </div>

    <div class="input-box display-none" id="hidden">
      <label for="age">Age<strong></strong></label>
      <input
        type="number"
        name="age"
        id="age"
        required
        placeholder="${this._data.age ? this._data.age : 28}"
      />
    </div>
    <div class="input-box display-none" id="hidden">
      <label for="height">Height<strong>(cm)</strong></label>
      <input
        type="number"
        name="height"
        id="height"
        required
        placeholder="${this._data.height ? this._data.height : 178}"
      />
    </div>
    <div class="input-box display-none" id="hidden">
      <label for="weekGoal"
        >Goal/week<strong></strong
      ></label>
      <select name="weekGoal" id="weekGoal" required>
        <option value="">Choose goal</option>
        <option value="-0.25kg" ${
          this._data.weekGoal === '-0.25kg' ? 'selected' : ''
        }>Lose (0.25kg)</option>
        <option value="-0.5kg" ${
          this._data.weekGoal === '-0.5kg' ? 'selected' : ''
        }>Lose (0.5kg)</option>
        <option value="-1kg" ${
          this._data.weekGoal === '-1kg' ? 'selected' : ''
        }>Lose (1kg)</option>
        <option value="+0.25kg" ${
          this._data.weekGoal === '+0.25kg' ? 'selected' : ''
        }>Gain (0.25kg)</option>
        <option value="+0.5kg" ${
          this._data.weekGoal === '+0.5kg' ? 'selected' : ''
        }>Gain (0.5kg)</option>
        <option value="+1kg" ${
          this._data.weekGoal === '+1kg' ? 'selected' : ''
        }>Gain (1kg)</option>
        <option value="0" ${
          this._data.weekGoal === '0' ? 'selected' : ''
        }>Maintain</option>
      </select>
    </div>

    <div class="input-box display-none" id="hidden">
      <label for="activity">Activity<strong></strong></label>
      <select name="activity" id="activity" required>
        <option value="">Choose activity</option>
        <option value="0" ${this._data.activity === '0' ? 'selected' : ''}>
        Sedentary
        </option>
        <option value="0.3kg"  ${
          this._data.activity === '0.3kg' ? 'selected' : ''
        }>
         Exercise 1-3 times per week
        </option>
        <option value="0.5kg"  ${
          this._data.activity === '0.5kg' ? 'selected' : ''
        }>
          Exercise 4-5 times per week
        </option>
        <option value="0.6kg"  ${
          this._data.activity === '0.6kg' ? 'selected' : ''
        }>
          Daily exercise, or intense exercise 3-4 times per week
        </option>
        <option value="0.9kg"  ${
          this._data.activity === '0.9kg' ? 'selected' : ''
        }>
          Intense exercise 6-7 times per week
        </option>
        <option value="1.3kg"  ${
          this._data.activity === '1.3kg' ? 'selected' : ''
        }>
          Very intense exercise daily, or a highly physical job
        </option>
      </select>
    </div>
    <button
      class="btn--form display-none"
      type="submit"
      id="hidden"
    >
      Register
    </button>`;
  }
}
