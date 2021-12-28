import { createElement } from "../helpers";

const getMoreButton = (text) => {
  const button = createElement('button', 'reset');
  button.classList.add('table-wrapper__contacts-more-btn');

  button.textContent = `+${text}`;

  return button
};

export default getMoreButton;