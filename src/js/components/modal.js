import { createElement } from '../helpers';


const getModal = (cl, title, btn, btnClass,  id = '') => {
  const modal = createElement('div', 'modal');
  modal.classList.add(cl);

  const modalTitle = createElement('h2', 'reset');
  modalTitle.classList.add('modal__title');
  modalTitle.textContent = title;
  const idText = createElement('span', 'modal__title--id');
  idText.textContent =  id;
  const modalForm = createElement('form', 'modal-form');
  const closeBtn = createElement('button', 'reset');
  closeBtn.classList.add('modal__close-btn');

  modalForm.innerHTML = `
    <div class="modal-form-group">
      <input class="modal-form__input modal-form__input-lastname" type="text" name="lastname" >
      <label class="modal-form__label">Фамилия<span class="modal-form__req">*</span></label>
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>
    <div class="modal-form-group">
      <input class="modal-form__input modal-form__input-name" type="text" name="name" >
      <label class="modal-form__label">Имя<span class="modal-form__req">*</span></label>
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>
    <div class="modal-form-group">
      <input class="modal-form__input modal-form__input-middlename" type="text" name="middleName" >
      <label class="modal-form__label">Отчество</label>
      <span class="highlight"></span>
      <span class="bar"></span>
    </div>
    <div class="modal-form__add">
      <div class="modal-form__add-contacts">
      </div>
      <button class="reset modal-form__add-btn">Добавить контакт</button>
    </div>
    <div class="modal-form__btns">
      <button type="submit" class="btn modal-form__btn ${btnClass}">Сохранить</button>
      <button type="submit" class="btn modal-form__btn--secondary ">${btn}</button>
    </div>
  `;

  modalTitle.append(idText);
  modal.append(modalTitle,closeBtn, modalForm)

  return modal
}

export default getModal;

