import { createElement } from "../helpers";

const spinnerWrapper = createElement('div', 'spin-wrapper');
const spinner = createElement('div', 'spin');

spinnerWrapper.append(spinner)

export default spinnerWrapper;