import createError from "./components/error";
import validator from 'validator';

const regWords = /^[А-Яа-я/]+$/g;


const isInvalid = (element, message) => {
  element.classList.remove('valid');
  element.classList.add('invalid')
  if(element.parentElement.querySelector('.error-text')) {
      element.parentElement.querySelector('.error-text').classList.remove('hide')
  } else {
    const error = createError(message);
    error.classList.add('error-text');
    element.parentElement.append(error);
  }

  element.parentElement.parentElement.parentElement.parentElement.querySelector('.modal-form__btn').disabled = true
};

const isValid = (element) => {
  element.classList.add('valid');
  element.classList.remove('invalid');
  if(element.parentElement.querySelector('.error-text')) {
      element.parentElement.querySelector('.error-text').classList.add('hide') 
  }
  element.parentElement.parentElement.parentElement.parentElement.querySelector('.modal-form__btn').disabled = false;
}

const checkName = (type) => {
  type.addEventListener('keypress', (e) => {
    let value = type.value + e.key;
    if(!value.match(regWords)) {
        e.preventDefault();
    } else {
        isValid(type);
    }
  });

  type.addEventListener('blur', () => {
      if(!type.value) {
          isInvalid(type, 'Вводите имя кириллицей');
          type.parentElement.querySelector('.modal-form__input').classList.add('modal-form__input--error')
      } else {
          isValid(type);
          type.parentElement.querySelector('.modal-form__input').classList.remove('modal-form__input--error')
      }
  })
}

const checkEmail = (email, el) => {
  email.addEventListener('blur', () => {
    const emailCheck = validator.isEmail(email.value);
    if(!emailCheck) {
        isInvalid(el, 'Неправильно введен email!');

    } else {
        isValid(el);
    }

    email.addEventListener('input', () => {
      email.classList.remove('invalid');
      
      if(email.parentElement.querySelector('.error-text')) {
        email.parentElement.querySelector('.error-text').classList.add('hide')
      }
    })
  });
  
}

export {isInvalid, isValid, checkName, checkEmail}
