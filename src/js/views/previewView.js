import icons from 'url:../../img/icons.svg'; //Parcel 2
import View from './View';

class previewView extends View {
  _parentElement = '';

  _generateMarkup() {
    const id = window.location.hash.slice(1);
    return `   <li class="preview">
    <a class="preview__link ${
      id === this._data.id ? 'preview__link--active' : ''
    }" href="#${this._data.id}">
      <figure class="preview__fig">
        <img src="${this._data.image}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${this._data.title}</h4>
        <p class="preview__publisher">${this._data.publisher}</p>
        <div class="recipe__user-generated ${this._data.key ? '' : 'hidden'}">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
       </div>
      </div>
    </a>
</li>`;
  }
}
export default new previewView();
