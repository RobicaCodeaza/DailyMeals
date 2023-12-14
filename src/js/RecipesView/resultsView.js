import icons from 'url:../../img/icons.svg'; //Parcel 2
import View from '../views/View';
import previewView from './previewView';

export default class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query!Please try again!';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
