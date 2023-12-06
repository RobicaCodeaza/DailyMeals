import View from '../View';

export default class GraphGeneralView extends View {
  _parentElement = document.querySelector('.graph__img');
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
        btnControl.classList.add('btn--control--active');
        this._allBtns.forEach(btn => {
          if (btn !== btnControl) btn.classList.remove('btn--control--active');
        });
        handler(btnControl.id);
      }.bind(this)
    );
  }
}
