import { createElement } from "../helpers";

const createError = (text) => {
  const error = createElement('div', 'error');
  error.textContent = text;

  return error
}

export default createError;
