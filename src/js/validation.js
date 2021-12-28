import './vendor/inputmask.min.js';

const validateField = (el, mask) => {
  const selector = el;
  const im = new Inputmask({
    mask: mask,
    greedy: false
  });
  im.mask(selector);
}

export default validateField;