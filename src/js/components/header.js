import {createElement} from '../helpers';

import logoPic from '../../img/logo.svg'

const headerWrapper = createElement('div', 'header__wrapper');
const logoBlock = createElement('div', 'header__logo');
const logoLink = createElement('a', 'header__logo-link');
const logo = createElement('img');
const searchBlock = createElement('div', 'header__search');
const search = createElement('input', 'header__search-input');

logo.setAttribute('alt', 'logo');
logo.setAttribute('src', logoPic);
logoLink.setAttribute('href', '#');

search.setAttribute('type', 'search');
search.setAttribute('placeholder', 'Введите запрос');

logoLink.append(logo)
logoBlock.append(logoLink);
searchBlock.append(search);
headerWrapper.append(logoBlock, searchBlock);

export {
  headerWrapper
}