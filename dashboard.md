    <div class="container container--dashboard">
          <header class="header header--main">
            <div class="header--main__date">22.11.2023</div>
            <div class="header--main__welcome">
              Welcome back, Stoica Robert!
            </div>
            <div class="header--main__user">
              <img src="/src/img/user.jpg" alt="User's Photo" />
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
                    <th>Food</th>
                    <th>Calories</th>
                    <th>Proteins</th>
                    <th>Carbs</th>
                    <th>Fat</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="breakfast">
                    <th>Breakfast</th>
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
                  <tr>
                    <td>125g</td>
                    <td>Poridge Oats</td>
                    <td>150 kcal</td>
                    <td>12g</td>
                    <td>50g</td>
                    <td>2g</td>
                  </tr>
                  <tr class="lunch">
                    <th>Lunch</th>
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
                  <tr>
                    <th></th>
                    <td>Poridge Oats</td>
                    <td>150 kcal</td>
                    <td>12g</td>
                    <td>50g</td>
                    <td>2g</td>
                  </tr>
                  <tr class="dinner">
                    <th>Dinner</th>
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
                  <tr>
                    <th></th>
                    <td>Poridge Oats</td>
                    <td>150 kcal</td>
                    <td>12g</td>
                    <td>50g</td>
                    <td>2g</td>
                  </tr>
                  <tr class="snack">
                    <th>Snack</th>
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
                  <tr>
                    <th></th>
                    <td>Poridge Oats</td>
                    <td>150 kcal</td>
                    <td>12g</td>
                    <td>50g</td>
                    <td>2g</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="general-splits">
              <div class="graph graph--general">
                <img
                  alt="General Graph Img"
                  class="graph--img"
                  id="img-graph-general-splits"
                />
              </div>

              <ul class="general-splits__control">
                <li
                  class="general-splits__control__item general-splits__control__item--active"
                >
                  <button class="btn--control" id="day-calories-split">
                    CALORIES(day)
                  </button>
                </li>
                <li class="general-splits__control__item">
                  <button class="btn--control" id="day-nutrients-split">
                    NUTRIENTS(day)
                  </button>
                </li>
                <li class="general-splits__control__item">
                  <button class="btn--control" id="all-calories-split">
                    CALORIES(days)
                  </button>
                </li>
                <li class="general-splits__control__item">
                  <button class="btn--control" id="all-nutrients-split">
                    NUTRIENTS(days)
                  </button>
                </li>
              </ul>
            </div>

            <div class="register-personal-stats">
              <form class="register-form" action="#">
                <div class="input-box">
                  <label for="current-weight"
                    >Current Weight <strong>(kg)</strong></label
                  >
                  <input
                    type="number"
                    name="current-weight"
                    id="current-weight"
                    required
                    placeholder="75"
                  />
                </div>

                <div class="input-box">
                  <label for="goal-weight"
                    >Weight Goal <strong>(kg)</strong></label
                  >
                  <input
                    type="number"
                    name="goal-weight"
                    id="goal-weight"
                    required
                    placeholder="70"
                  />
                </div>

                <div class="input-box">
                  <label for="current-body-fat"
                    >Current Body Fat <strong>(%)</strong></label
                  >
                  <input
                    type="number"
                    name="current-body-fat"
                    id="current-body-fat"
                    required
                    placeholder="25%"
                  />
                </div>

                <div class="input-box">
                  <label for="goal-body-fat">
                    Body Fat Goal<strong>(%)</strong></label
                  >
                  <input
                    type="number"
                    name="goal-body-fat"
                    id="goal-body-fat"
                    required
                    placeholder="15%"
                  />
                </div>
                <div class="input-box">
                  <button class="btn--set" id="btn-set">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      fill="#000000"
                      viewBox="0 0 256 256"
                    >
                      <path
                        d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80A8,8,0,0,1,53.66,90.34L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="input-box display-none" id="hidden">
                  <label for="age">Age<strong></strong></label>
                  <input
                    type="number"
                    name="age"
                    id="age"
                    required
                    placeholder="43"
                  />
                </div>
                <div class="input-box display-none" id="hidden">
                  <label for="height">Height<strong>(cm)</strong></label>
                  <input
                    type="number"
                    name="height"
                    id="height"
                    required
                    placeholder="178"
                  />
                </div>
                <div class="input-box display-none" id="hidden">
                  <label for="actual-goal"
                    >Weight Goal(per week)<strong></strong
                  ></label>
                  <select name="actual-goal" id="actual-goal" required>
                    <option value="">Choose goal</option>
                    <option value="-0.25kg">Lose (0.25kg)</option>
                    <option value="-0.5kg">Lose (0.5kg)</option>
                    <option value="-1kg">Lose (1kg)</option>
                    <option value="+0.25kg">Gain (0.25kg)</option>
                    <option value="+0.5kg">Gain (0.5kg)</option>
                    <option value="+1kg">Gain (1kg)</option>
                    <option value="maintain">Maintain</option>
                  </select>
                </div>

                <div class="input-box display-none" id="hidden">
                  <label for="actual-goal">Activity<strong></strong></label>
                  <select name="actual-goal" id="actual-goal" required>
                    <option value="">Choose activity</option>
                    <option value="-0.2kg">
                      Daily exercise, or intense exercise 3-4 times per week
                    </option>
                    <option value="-0.6kg">
                      Intense exercise 6-7 times per week
                    </option>
                    <option value="-1kg">
                      Very intense exercise daily, or a highly physical job
                    </option>
                  </select>
                </div>
                <button
                  class="btn--form display-none"
                  type="submit"
                  id="hidden"
                >
                  Register
                </button>
              </form>
            </div>
            <div class="graph graph--stats">Graph Stats</div>
            <div class="meal-stats">
              <div class="meal-stats__stat">
                <div class="meal-stats__stat__icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="icon-calories"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
                    />
                  </svg>
                </div>
                <div class="meal-stats__stat__total">
                  <span class="meal-stats__stat__total__value">465 kcal</span>
                  <span class="meal-stats__stat__total__name">Calories</span>
                </div>
              </div>
              <div class="meal-stats__stat">
                <div class="meal-stats__stat__icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="icon-weight"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z"
                    />
                  </svg>
                </div>
                <div class="meal-stats__stat__total">
                  <span class="meal-stats__stat__total__value">72 kg</span>
                  <span class="meal-stats__stat__total__name">Weight</span>
                </div>
              </div>
              <div class="meal-stats__stat">
                <div class="meal-stats__stat__icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#000000"
                    viewBox="0 0 256 256"
                    class="icon-body-fat"
                  >
                    <path
                      d="M205.66,61.64l-144,144a8,8,0,0,1-11.32-11.32l144-144a8,8,0,0,1,11.32,11.31ZM50.54,101.44a36,36,0,0,1,50.92-50.91h0a36,36,0,0,1-50.92,50.91ZM56,76A20,20,0,1,0,90.14,61.84h0A20,20,0,0,0,56,76ZM216,180a36,36,0,1,1-10.54-25.46h0A35.76,35.76,0,0,1,216,180Zm-16,0a20,20,0,1,0-5.86,14.14A19.87,19.87,0,0,0,200,180Z"
                    ></path>
                  </svg>
                </div>
                <div class="meal-stats__stat__total">
                  <span class="meal-stats__stat__total__value">15%</span>
                  <span class="meal-stats__stat__total__name">Body fat</span>
                </div>
              </div>
              <div class="meal-stats__stat">
                <div class="meal-stats__stat__icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#000000"
                    viewBox="0 0 256 256"
                    class="icon-proteins"
                  >
                    <path
                      d="M186.66,59.56C168.47,32.29,146.54,16,128,16S87.53,32.29,69.34,59.56C50.7,87.54,40,121.23,40,152a88,88,0,0,0,176,0C216,121.23,205.3,87.54,186.66,59.56ZM128,224a72.08,72.08,0,0,1-72-72c0-27.69,9.72-58.15,26.66-83.56C97.19,46.64,115.41,32,128,32c9.5,0,22.2,8.33,34.1,21.78L122,98.67a8,8,0,0,0,4,13.09l24.6,6.15-6.5,32.52a8,8,0,0,0,6.27,9.41A7.77,7.77,0,0,0,152,160a8,8,0,0,0,7.83-6.43l8-40a8,8,0,0,0-5.9-9.33l-19.16-4.79L172.1,66.6c.42.61.83,1.22,1.24,1.84C190.28,93.85,200,124.31,200,152A72.08,72.08,0,0,1,128,224Z"
                    ></path>
                  </svg>
                </div>
                <div class="meal-stats__stat__total">
                  <span class="meal-stats__stat__total__value">120 g</span>
                  <span class="meal-stats__stat__total__name">Protein</span>
                </div>
              </div>
              <div class="meal-stats__stat">
                <div class="meal-stats__stat__icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#000000"
                    viewBox="0 0 256 256"
                    class="icon-carbs"
                  >
                    <path
                      d="M224,104h-8.37a88,88,0,0,0-175.26,0H32a8,8,0,0,0-8,8,104.35,104.35,0,0,0,56,92.28V208a16,16,0,0,0,16,16h64a16,16,0,0,0,16-16v-3.72A104.35,104.35,0,0,0,232,112,8,8,0,0,0,224,104Zm-24.46,0H148.12a71.84,71.84,0,0,1,41.27-29.57A71.45,71.45,0,0,1,199.54,104ZM173.48,56.23q2.75,2.25,5.27,4.75a87.92,87.92,0,0,0-49.15,43H100.1A72.26,72.26,0,0,1,168,56C169.83,56,171.66,56.09,173.48,56.23ZM128,40a71.87,71.87,0,0,1,19,2.57A88.36,88.36,0,0,0,83.33,104H56.46A72.08,72.08,0,0,1,128,40Zm36.66,152A8,8,0,0,0,160,199.3V208H96v-8.7A8,8,0,0,0,91.34,192a88.29,88.29,0,0,1-51-72H215.63A88.29,88.29,0,0,1,164.66,192Z"
                    ></path>
                  </svg>
                </div>
                <div class="meal-stats__stat__total">
                  <span class="meal-stats__stat__total__value">200g</span>
                  <span class="meal-stats__stat__total__name">Carbs</span>
                </div>
              </div>
              <div class="meal-stats__stat">
                <div class="meal-stats__stat__icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    fill="#000000"
                    viewBox="0 0 256 256"
                    class="icon-fats"
                  >
                    <path
                      d="M164.49,163.51a12,12,0,1,1-17,0A12,12,0,0,1,164.49,163.51Zm-81-8a12,12,0,1,0,17,0A12,12,0,0,0,83.51,155.51Zm9-39a12,12,0,1,0-17,0A12,12,0,0,0,92.49,116.49Zm48-1a12,12,0,1,0,0,17A12,12,0,0,0,140.49,115.51ZM232,128A104,104,0,1,1,128,24a8,8,0,0,1,8,8,40,40,0,0,0,40,40,8,8,0,0,1,8,8,40,40,0,0,0,40,40A8,8,0,0,1,232,128Zm-16.31,7.39A56.13,56.13,0,0,1,168.5,87.5a56.13,56.13,0,0,1-47.89-47.19,88,88,0,1,0,95.08,95.08Z"
                    ></path>
                  </svg>
                </div>
                <div class="meal-stats__stat__total">
                  <span class="meal-stats__stat__total__value">46g</span>
                  <span class="meal-stats__stat__total__name">Fats</span>
                </div>
              </div>
            </div>
          </div>
        </div>
