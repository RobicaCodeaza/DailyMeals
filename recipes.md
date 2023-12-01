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
                  <use href="/src/img/icons.svg#icon-search"></use>
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
                      <use href="/src/img/icons.svg#icon-edit"></use>
                    </svg>
                    <span>Add recipe</span>
                  </button>
                </li>
                <li class="nav-recipesView__item">
                  <button
                    class="nav-recipesView__btn nav-recipesView__btn--bookmarks"
                  >
                    <svg class="nav-recipesView__icon">
                      <use href="/src/img/icons.svg#icon-bookmark"></use>
                    </svg>
                    <span>Bookmarks</span>
                  </button>
                  <div class="bookmarks">
                    <ul class="bookmarks__list">
                      <div class="message">
                        <div>
                          <svg>
                            <use href="/src/img/icons.svg#icon-smile"></use>
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
            <ul class="results">
              <li class="preview">
                <a class="preview__link preview__link--active" href="#23456">
                  <figure class="preview__fig">
                    <img src="src/img/test-1.webp" alt="Test" />
                  </figure>
                  <div class="preview__data">
                    <div class="preview__data__text">
                      <h4 class="preview__title">Pasta with Tomato Cream</h4>
                      <span class="calories">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="32"
                          height="32"
                          fill="#000000"
                          viewBox="0 0 256 256"
                        >
                          <path
                            d="M173.79,51.48a221.25,221.25,0,0,0-41.67-34.34,8,8,0,0,0-8.24,0A221.25,221.25,0,0,0,82.21,51.48C54.59,80.48,40,112.47,40,144a88,88,0,0,0,176,0C216,112.47,201.41,80.48,173.79,51.48ZM96,184c0-27.67,22.53-47.28,32-54.3,9.48,7,32,26.63,32,54.3a32,32,0,0,1-64,0Zm77.27,15.93A47.8,47.8,0,0,0,176,184c0-44-42.09-69.79-43.88-70.86a8,8,0,0,0-8.24,0C122.09,114.21,80,140,80,184a47.8,47.8,0,0,0,2.73,15.93A71.88,71.88,0,0,1,56,144c0-34.41,20.4-63.15,37.52-81.19A216.21,216.21,0,0,1,128,33.54a215.77,215.77,0,0,1,34.48,29.27C193.49,95.5,200,125,200,144A71.88,71.88,0,0,1,173.27,199.93Z"
                          ></path>
                        </svg>
                        <strong>465</strong>
                        Calories
                      </span>
                      <div class="preview__data__text__tags">
                        <span class="tag tag--protein">98g Proteins</span>
                        <span class="tag tag--carbs">120g Carbs</span>
                        <span class="tag tag--fats">100g Fats</span>
                      </div>
                    </div>
                    <!-- <p class="preview__publisher">The Pioneer Woman</p> -->
                    <div class="preview__user-generated">
                      <svg>
                        <use href="src/img/icons.svg#icon-user"></use>
                      </svg>
                    </div>
                  </div>
                </a>
              </li>
            </ul>

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
          <div class="recipe">
            <div class="recipe__header">
              <figure class="recipe__fig">
                <img
                  src="src/img/test-1.webp"
                  alt="photo
            "
                  class="recipe__img"
                />
              </figure>

              <div class="recipe__details">
                <h1 class="recipe__title">
                  <span>Title</span>
                </h1>
                <div class="recipe__info">
                  <svg class="recipe__info-icon">
                    <use href="src/img/icons.svg#icon-clock"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--minutes"
                    >Cooking time</span
                  >
                  <span class="recipe__info-text">minutes</span>
                </div>
                <div class="recipe__info">
                  <svg class="recipe__info-icon">
                    <use href="src/img/icons.svg#icon-users"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--people"
                    >servings</span
                  >
                  <span class="recipe__info-text">45</span>

                  <div class="recipe__info-buttons">
                    <button
                      data-update-to="servings"
                      class="btn--tiny btn--update-servings"
                    >
                      <svg>
                        <use href="src/img/icons.svg#icon-minus-circle"></use>
                      </svg>
                    </button>
                    <button
                      data-update-to="."
                      class="btn--tiny btn--update-servings"
                    >
                      <svg>
                        <use href="src/img/icons.svg#icon-plus-circle"></use>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="user-box">
                  <div class="recipe__user-generated">
                    <svg>
                      <use href="src/img/icons.svg#icon-user"></use>
                    </svg>
                  </div>
                  <button class="btn--round btn--bookmark">
                    <svg class="">
                      <use href="src/img/icons.svg#icon-bookmark-fill"></use>
                    </svg>
                  </button>
                </div>
                <div class="user-box">
                  <form action="#" id="form-meal-time">
                    <select
                      name="select-meal-time"
                      id="select-meal-time"
                      required
                    >
                      <option value="">Choose meal time</option>
                      <option value="breakfast">Breakfast</option>
                      <option value="lunch">Lunch</option>
                      <option value="dinner">Dinner</option>
                      <option value="snack">Snack</option>
                    </select>
                    <button type="submit" class="btn--form">Add meal</button>
                  </form>
                </div>
              </div>
            </div>

            <div class="recipe__cooking">
              <div class="recipe__ingredients">
                <h2 class="heading--2">Recipe ingredients</h2>
                <ul class="recipe__ingredient-list">
                  <li class="recipe__ingredient">
                    <svg class="recipe__icon">
                      <use href="src/img/icons.svg#icon-check"></use>
                    </svg>
                    <div class="recipe__quantity">quantity</div>
                    <div class="recipe__description">
                      <span class="recipe__unit">unit</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div class="recipe__directions">
                <h2 class="heading--2">How to cook it</h2>
                <p class="recipe__directions-text">
                  This recipe was carefully designed and tested by
                  <span class="recipe__publisher">Publisher</span>. Please check
                  out directions at their website.
                </p>
                <a class="btn--small recipe__btn" href="#" target="_blank">
                  <span>Directions</span>
                  <svg class="search__icon">
                    <use href="src/img/icons.svg#icon-arrow-right"></use>
                  </svg>
                </a>
              </div>
            </div>
          </div>
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
                <use href="/src/img/icons.svg#icon-upload-cloud"></use>
              </svg>
              <span>Upload</span>
            </button>
          </form>
        </div>
