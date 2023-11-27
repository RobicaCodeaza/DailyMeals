export default class SearchView {
  #parentElement = document.querySelector('.search');
  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }
  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }
  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      console.log('Entered Search');
      e.preventDefault();
      handler();
    });
  }
}
