import View from '../views/View';

export default class GraphStatsView extends View {
  _parentElement = document.querySelector('#img-graph-stats');
  _mealStats = document.querySelector('.meal-stats');
  addHandlerRender(handler) {
    window.addEventListener('popstate', function (e) {
      handler();
    });
  }
  addHandlerModifyGraph(handler) {
    this._mealStats.addEventListener(
      'click',
      function (e) {
        const btnStat = e.target.closest('.meal-stats__stat');
        if (!btnStat) return;
        this.activateButton(
          btnStat,
          'meal-stats__stat',
          'meal-stats__stat--active'
        );
        const { color } = btnStat.dataset;
        const graphType = btnStat.id;
        handler(graphType, color);
      }.bind(this)
    );
  }
}
