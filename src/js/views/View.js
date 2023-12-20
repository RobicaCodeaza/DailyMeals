import icons from 'url:../../img/icons.svg'; //Parcel 2

export default class View {
  _data;
  _element;
  /**
   *Render the received object to the DOM
   @param {Object | Object[]} data The data to be rendered(e.g. recipe)
   @param {boolean} [render = true] If false, create markup string instead of rendering to the dom
   @returns {undefined | string} A markup string is returned if render = false
   @this {Object} View instance
   @author Stoica Robert
   @todo Maybe increase functionality
   */
  render(data, render = true, element = '', afterEnd = false) {
    element ? (this._parentElement = element) : '';
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) {
      return markup;
    }
    if (!afterEnd) this._clear();
    if (!afterEnd) this._parentElement.insertAdjacentHTML('afterbegin', markup);
    else this._parentElement.insertAdjacentHTML('afterend', markup);
  }

  update(data, element = '') {
    this._data = data;
    const newMarkup = this._generateMarkup();
    //Converting string object to newDom(virtual dom)
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));
    if (newElements.length < curElements.length) {
      this._clear();
      this._parentElement.insertAdjacentHTML('beforeend', newMarkup);
    } else
      newElements.forEach((newEl, i) => {
        const curEl = curElements[i];

        // Update changed text
        if (
          !curEl.isEqualNode(newEl) &&
          newEl.firstChild?.nodeValue.trim() !== ''
        ) {
          curEl.textContent = newEl.textContent;
        }
        // Update changed attribute
        if (!newEl.isEqualNode(curEl)) {
          Array.from(newEl.attributes).forEach(attr =>
            curEl.setAttribute(attr.name, attr.value)
          );
        }
      });
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = ` 
   <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = ` 
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  activateButton(btn, btnClass, classAdded) {
    const allBtns = document.querySelectorAll(`.${btnClass}`);
    btn.classList.add(`${classAdded}`);
    allBtns.forEach(btnElse => {
      if (btnElse !== btn) btnElse.classList.remove(`${classAdded}`);
    });
  }
}
