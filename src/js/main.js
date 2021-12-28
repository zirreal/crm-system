import { createElement} from "./helpers";

import { headerWrapper } from "./components/header";
import { title, table, tableWrapper } from "./components/table";
import createTableItem from "./components/tableItem";
import { addButtonWrapper } from "./components/addButton";
import getModal from './components/modal';
import spinnerWrapper from "./components/spinner";
import getDeleteModal from './components/deleteModal';
import getImages from "./components/getContactsImages";

import getClients from './server/getClients';
import getTippy from "./libs";

const header = createElement('header', 'header');
const main = createElement('main');
const container = createElement('div', 'container');
const overlay = createElement('div', 'overlay');
const tbody = createElement('tbody', 'table-wrapper');
const modalAdd = getModal('modal-add', 'Новый клиент', 'Отмена', 'modal-form__btn--save');
const modalChange = getModal('modal-change', 'Изменить данные', 'Удалить клиента', 'modal-form__btn--change');
const deleteModal = getDeleteModal();

table.append(tbody);
header.append(headerWrapper);
main.append(overlay, container);
container.append(title, tableWrapper, addButtonWrapper, modalAdd, modalChange, deleteModal)
document.body.append(header, main);

export const showTable = async (info) => {
  const optionsDate = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    timezone: 'UTC'
  };

  const optionsTime = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timezone: 'UTC'
  };

  tbody.append(spinnerWrapper);

  const data = await info;
  tbody.innerHTML = '';
  data.map(item => {
    const date = new Date(item.createdAt).toLocaleString("ru", optionsDate);
    const time = new Date(item.createdAt).toLocaleString("ru", optionsTime);
    const changesDate = new Date(item.updatedAt).toLocaleString("ru", optionsDate);
    const changesTime = new Date(item.updatedAt).toLocaleString("ru", optionsTime);
    if(!item.contacts.length) {
      tbody.innerHTML += createTableItem(item.id, item.name, item.lastName, item.surname, date, time, changesDate, changesTime, ''); 
    } else {
      tbody.innerHTML += createTableItem(item.id, item.name, item.lastName, item.surname, date, time, changesDate, changesTime,  getImages(item.contacts, document.querySelector('.table-wrapper__contacts-img'))); 
      setTooltips();
    }

    
  })
};
showTable(getClients('https://zirreal-cmr-server.herokuapp.com/api/clients'));

const setTooltips = async () => {
  await getClients('https://zirreal-cmr-server.herokuapp.com/api/clients');
  const tooltips = document.querySelectorAll('.table-wrapper__contacts-img');
  tooltips.forEach(tooltip => {
    getTippy(tooltip, `${tooltip.getAttribute('data-type')}: ${tooltip.getAttribute('data-value')}`)
  })
}


