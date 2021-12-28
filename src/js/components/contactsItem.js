import { createElement } from "../helpers";


const createContactsItem = () => {
  const contactsFieldWrapper = createElement('div', 'modal-form__add-wrapper')
  contactsFieldWrapper.innerHTML = `
    <label class="modal-form__select-label">
      <select name="select" class="modal-form__select selectCustom" aria-label="Выбрать тип контакта">
      </select>
    </label>
    <input class="modal-form__select-input" type="text" placeholder="Введите данные контакта" name="contacts">
    <button class="reset modal-form__select-btn"></button>
  `
  return contactsFieldWrapper;
}

export default createContactsItem;