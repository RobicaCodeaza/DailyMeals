export default class CalendarView {
  addHandlerRender(handler) {
    ['popstate'].forEach(e => window.addEventListener(e, handler));
  }
}
