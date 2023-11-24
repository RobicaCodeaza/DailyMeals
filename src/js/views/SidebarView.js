import View from './View';
import user from 'url:../../img/user.jpg';
import icons from 'url:../../img/icons.svg';

export default class SidebarView extends View {
  _parentElement = document.querySelector('.current-view');
  _sidebar = document.querySelector('.sidebar__nav');
  _allMenuBtns = Array.from(document.querySelectorAll('.buttonMenu'));
  addHandlerRender(handler) {
    window.addEventListener(
      'click',
      function (e) {
        console.log(this);
        if (e.target.closest('.buttonMenu')) {
          const btnClicked = e.target.closest('.buttonMenu');
          btnClicked.classList.add('sidebar__nav__btn--active');
          this._allMenuBtns.forEach(btn => {
            if (btn !== btnClicked) {
              console.log(btn);
              btn.classList.remove('sidebar__nav__btn--active');
            }
          });
          handler(btnClicked.id.trim());
        }
      }.bind(this)
    );
  }
  _generateMarkup() {
    if (this._data === 'MealsDashboardView') {
      console.log('Entered Meals Dashboard');
      return `
    <div class="container container--dashboard">
      <header class="header header--main">
        <div class="header--main__date">22.11.2023</div>
        <div class="header--main__welcome">
          Welcome back, Stoica Robert!
        </div>
        <div class="header--main__user">
          <img src="${user}" alt="User's Photo" />
        </div>
      </header>
        <div class="calendar"></div>
    </div>

      `;
    }
    if (this._data.trim() === 'RecipesView') {
      console.log(window.location.hash);
      console.log('Entered Recipes');
      return `
      <div class="container container--recipes">
      <div class="header header--recipes">
        <form class="search">
          <input
            type="text"
            class="search__field"
            placeholder="Search over 1,000,000 recipes..."
          />
          <button class="btn--recipes search__btn">
            <svg class="search__icon">
              <use href="${icons}#icon-search"></use>
            </svg>
            <span></span>
          </button>
        </form>

        <nav class="nav-recipesView">
          <ul class="nav-recipesView__list">
            <li class="nav-recipesView__item">
              <button
                class="nav-recipesView__btn nav-recipesView__btn--add-recipe"
              >
                <svg class="nav-recipesView__icon">
                  <use href="${icons}#icon-edit"></use>
                </svg>
                <span>Add recipe</span>
              </button>
            </li>
            <li class="nav-recipesView__item">
              <button
                class="nav-recipesView__btn nav-recipesView__btn--bookmarks"
              >
                <svg class="nav-recipesView__icon">
                  <use href="${icons}#icon-bookmark"></use>
                </svg>
                <span>Bookmarks</span>
              </button>
              <div class="bookmarks">
                <ul class="bookmarks__list">
                  <div class="message">
                    <div>
                      <svg>
                        <use href="${icons}#icon-smile"></use>
                      </svg>
                    </div>
                    <p>
                      No bookmarks yet. Find a nice recipe and bookmark it
                      :)
                    </p>
                  </div>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>

      <div class="search-results">
        <ul class="results"></ul>

        <div class="pagination"></div>

        <p class="copyright">
          &copy; Copyright by
          <a
            class="twitter-link"
            target="_blank"
            href="https://twitter.com/jonasschmedtman"
            >Stoica Robert</a
          >. Use for learning or your portfolio. Don't use to teach. Don't
          claim as your own.
        </p>
      </div>
      <div class="recipe"></div>
    </div>
    <div class="add-recipe-window hidden">
      <button class="btn--close-modal">&times;</button>
      <form class="upload">
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TEST23" required name="title" type="text" />
          <label>URL</label>
          <input value="TEST23" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="TEST23" required name="image" type="text" />
          <label>Publisher</label>
          <input value="TEST23" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="23" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="23" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn--recipes upload__btn">
          <svg>
            <use href="${icons}#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>
    </div>

      `;
    }
  }
}
