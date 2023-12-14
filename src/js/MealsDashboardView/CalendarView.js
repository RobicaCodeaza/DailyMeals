import * as datedreamer from 'datedreamer';
import View from '../views/View';

export default class CalendarView extends View {
  _parentElement = '#calendar';
  _datedreamerCalendar = '';
  addHandlerRender(handler) {
    ['popstate'].forEach(e => window.addEventListener(e, handler));
  }
  renderCalendar(date, handlerFunc) {
    this._datedreamerCalendar = new datedreamer.calendarToggle({
      selectedDate: `${date}`,
      element: `${this._parentElement}`,
      format: 'MM/DD/YYYY',
      // darkMode: true,
      theme: 'lite-purple',
      // custom styles here
      styles: `
       button{
       color:#003554,
      
       }
       .datedreamer-calendar-toggle{
        width:25rem;
       }
      `,

      onChange: e => {
        handlerFunc(e.detail);
      },
    });
  }
}
