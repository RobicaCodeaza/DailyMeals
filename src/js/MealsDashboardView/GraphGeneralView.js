import View from '../views/View';

export default class GraphGeneralView extends View {
  _parentElement = document.querySelector('#img-graph-general-splits');
  _allBtns = document.querySelectorAll('.btn--control');
  addHandlerRender(handler) {
    ['load', 'popstate'].forEach(e =>
      window.addEventListener(e, function () {
        handler();
      })
    );
  }

  addHandlerModifyGraph(handler) {
    document.querySelector('.general-splits__control').addEventListener(
      'click',
      function (e) {
        const btnControl = e.target.closest('.btn--control');
        if (!btnControl) return;
        this.activateButton(btnControl, 'btn--control', 'btn--control--active');
        handler(btnControl.id);
      }.bind(this)
    );
  }
  resetBtns() {
    const btnMain = document.querySelector('#general-day-calories-split');
    this.activateButton(btnMain, 'btn--control', 'btn--control--active');
  }
}
