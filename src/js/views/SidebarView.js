import View from './View';
import user from 'url:../../img/user.jpg';
import icons from 'url:../../img/icons.svg';

export default class SidebarView extends View {
  _parentElement = document.querySelector('.current-view');
  _sidebar = document.querySelector('.sidebar__nav');
  _allMenuBtns = Array.from(document.querySelectorAll('.buttonMenu'));
  _tabPortMedia = window.matchMedia('(max-width: 56.25em)');
  constructor() {
    super();
    this.matchMediaTabPort();
    window.addEventListener('resize', this.matchMediaTabPort.bind(this));
  }
  matchMediaTabPort() {
    if (this._tabPortMedia.matches) {
      this._sidebar
        .querySelectorAll('.to-be-hidden')
        ?.forEach(el =>
          !this._sidebar.classList.contains('sidebar__nav--active')
            ? el.classList.add(
                'display-none',
                'not-visible',
                'translated-y-100'
              )
            : ''
        );

      const menuOpen = document.querySelector('.sidebar__nav__btn--open');
      menuOpen.classList.remove('display-none');
    } else {
      this._sidebar
        .querySelectorAll('.to-be-hidden')
        ?.forEach(el =>
          el.classList.remove('display-none', 'not-visible', 'translated-y-100')
        );

      const menuOpen = document.querySelector('.sidebar__nav__btn--open');
      menuOpen.classList.add('display-none');

      this._sidebar.classList.remove('sidebar__nav--active');
    }
  }
  addHandlerRender(handler) {
    this._sidebar.addEventListener(
      'click',
      function (e) {
        if (!e.target.closest('.buttonMenu')) return;
        const btnClicked = e.target.closest('.buttonMenu');
        this.activateButton(
          btnClicked,
          'buttonMenu',
          'sidebar__nav__btn--active'
        );

        if (this._tabPortMedia.matches) this.toggleMenuVisibilty(e);
        handler(btnClicked.id);
      }.bind(this)
    );
  }
  toggleMenuVisibilty(e) {
    const elementsMenu = this._sidebar.querySelectorAll('.to-be-hidden');
    elementsMenu.forEach(el => {
      el.classList.toggle('display-none');
      el.classList.toggle('translated-y-100');
      el.classList.toggle('not-visible');
    });

    this._sidebar.classList.contains('sidebar__nav--active')
      ? this._sidebar.classList.remove('sidebar__nav--active')
      : this._sidebar.classList.add('sidebar__nav--active');
  }
  addHandlerMenuOpen() {
    const menuOpen = document.querySelector('.sidebar__nav__btn--open');

    menuOpen?.addEventListener('click', this.toggleMenuVisibilty.bind(this));
  }

  _generateMarkup() {
    if (this._data.includes('RecipesView')) {
      return `
      <div class="container container--recipes">
      <div class="header header--recipes">
       <div class="calendar display-none" id="calendar"></div> 
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
    <div class="overlay hidden"></div>
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
    } else {
      return `
      <div class="container container--dashboard">
      <header class="header header--main">
        <div class="header--main__date">${new Date().getDate()}/${
        new Date().getMonth() + 1
      }/${new Date().getFullYear()}</div>
        <div class="header--main__welcome">
          Welcome back, Stoica Robert!
        </div>
        <div class="header--main__user">
          <img src="${user}" alt="User's Photo" />
        </div>
      </header>
      <div class="meals-details">
        <div class="add-meals">
          <div class="add-meals__header">
            <span class="add-meals__header__title title__dashboard"
              >Food Entries</span
            >
            <div class="calendar" id="calendar"></div>
          </div>
          <table class="add-meals__table">
            <thead>
              <tr>
                <th></th>
                <th>Grams</th>
                <th>Calories</th>
                <th>Proteins</th>
                <th>Carbs</th>
                <th>Fat</th>
                <th></th>
              </tr>
            </thead>
            <tbody class ='add-meals__table__body'>
              <tr class = 'breakfast'>
                <th>Breakfast</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button class="btn--add" id="breakfast">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#000000"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
           
              <tr class="lunch">
                <th>Lunch</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button class="btn--add" id="lunch">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#000000"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
        
              <tr class="dinner">
                <th>Dinner</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button class="btn--add" id="dinner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#000000"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
         
              <tr class="snack">
                <th>Snack</th>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <button class="btn--add" id="snack">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#000000"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"
                      ></path>
                    </svg>
                  </button>
                </td>
              </tr>
     
            </tbody>
          </table>
        </div>
        
        <div class="general-splits">
          <div class="graph graph--general">
            <img
              alt="General Graph Img"
              class="graph__img "
              id="img-graph-general-splits"
            />
          </div>

          <ul class="general-splits__control">
            <li
              class="general-splits__control__item "
            >
              <button class="btn--control btn--control--active" id="general-day-calories-split">
                CALORIES(day)
              </button>
            </li>
            <li class="general-splits__control__item">
              <button class="btn--control" id="general-day-nutrients-split">
                NUTRIENTS(day)
              </button>
            </li>
            <li class="general-splits__control__item">
              <button class="btn--control" id="general-all-calories-split">
                CALORIES(days)
              </button>
            </li>
            <li class="general-splits__control__item">
              <button class="btn--control" id="general-all-nutrients-split">
                NUTRIENTS(days)
              </button>
            </li>
          </ul>
      </div>
      <div class="register-personal-stats">
        <form class="register-form">
        </form>
      </div>
        <div class="graph graph--stats">
          <img
          alt="Stats Graph Img"
          class="graph__img"
          id="img-graph-stats"
          />
        </div>
        <div class="meal-stats"></div>
      </div>
    </div>
      `;
    }
  }
}
