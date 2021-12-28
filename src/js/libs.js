import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

const getTippy = (sel, value) => {
  tippy(sel, {
    content: value,
  });
}

export default getTippy;
