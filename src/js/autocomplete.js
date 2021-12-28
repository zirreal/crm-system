import { createElement } from "./helpers";

const getAutocomplete = (inp, arr, parent) => {
  let currentFocus;
  inp.addEventListener("input", (e) => {
      const val = e.target.value;
      closeAllLists();
      if (!val) { return false;}
      currentFocus = -1;
      const block = createElement('div', 'header__search-input-autocomplete');
      parent.append(block);
      arr.forEach(item => {
        if (item.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
          const element = createElement('div','header__search-input-autocomplete__item')
          element.innerHTML = `<strong>${item.substr(0, val.length)}</strong>`;
          element.innerHTML += item.substr(val.length);
          element.innerHTML += `<input type='hidden' value='${item}'> `;
              element.addEventListener("click", (e) => {
              let lastname = e.target.textContent.split(" ")[0]
              inp.value = lastname;
              closeAllLists();
          });
          block.append(element);

        }
      })
  });

  inp.addEventListener("keydown", (e) => {
      let els = document.querySelectorAll('.header__search-input-autocomplete__item');
      if (e.keyCode === 40) {
        currentFocus++;
        addActive(els);
      } else if (e.keyCode === 38) { 
        currentFocus--;
        addActive(els);
      } else if (e.key === 'Enter') {
        if (document.querySelector('.header__search-input-autocomplete')) {
          if(document.querySelector('.header__search-input-autocomplete').children.length) {
            let lastname = els[currentFocus].textContent.split(" ")[0];
            inp.value = lastname;
            closeAllLists();
          }
        }
      }
  });
  function addActive(elem) {
    if (!elem) return false;
    removeActive(elem);
    if (currentFocus >= elem.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (elem.length - 1);
    elem[currentFocus].classList.add('header__search-input-autocomplete__item-active');
  }
  function removeActive(x) {
    for (let i = 0; i < x.length; i++) {
      x[i].classList.remove("header__search-input-autocomplete__item-active");
    }
  }
  function closeAllLists(elmnt) {
    const els = document.querySelectorAll(".header__search-input-autocomplete__item");
    els.forEach(el => {
      if (elmnt != el && elmnt != inp) {
        el.parentElement.remove(el);
      }
    })
  }

  document.addEventListener("click", (e) => {
    closeAllLists(e.target);
  });
}

export default getAutocomplete;