import View from '../View';

class addMealsView extends View {
  _parentElement = document.querySelector('.add-meals');
  _btns = document.querySelectorAll('.btn--add');
  addHandlerMealTime(handler) {
    this._parentElement.addEventListener('click', function (e) {
      if (!e.target.closest('.btn--add')) return;
      console.log('Entered');
      const mealTime = e.target.closest('.btn--add').id;
      handler(mealTime);
    });
  }
}
export default addMealsView;
