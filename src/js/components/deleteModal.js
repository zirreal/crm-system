import { createElement } from '../helpers';

const getDeleteModal = () => {
  const modal = createElement('div', 'modal');
  modal.classList.add('modal-delete');

  const modalTitle = createElement('h2', 'reset');
  modalTitle.classList.add('modal__title');
  modalTitle.textContent = 'Удалить контакт';

  const body = createElement('p', 'reset');
  body.classList.add('modal-delete__text');
  body.textContent = 'Вы действительно хотите удалить данного клиента?';

  const closeBtn = createElement('button', 'reset');
  closeBtn.classList.add('modal__close-btn');

  const btnsWrapper = createElement('div', 'modal-form__btns');

  const deleteBtn = createElement('button', 'btn');
  deleteBtn.classList.add('modal-form__btn', 'modal-form__btn--delete');
  deleteBtn.textContent = 'Удалить клиента';

  const secondaryBtn = createElement('button', 'btn');
  secondaryBtn.classList.add('modal-form__btn--secondary');
  secondaryBtn.textContent = 'Отмена'

  btnsWrapper.append(deleteBtn, secondaryBtn);

  modal.append(modalTitle,closeBtn, body, btnsWrapper)

  return modal
}

export default getDeleteModal;