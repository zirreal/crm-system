import { createElement } from "../helpers";

const addButtonWrapper = createElement('div', 'add-button__wrapper');

const addButton = createElement('button', 'btn');
addButton.classList.add('add-button');
addButton.textContent = 'Добавить клиента';

addButtonWrapper.append(addButton);

export {addButtonWrapper};