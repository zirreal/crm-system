import { createElement } from "../helpers";

const createTableHeaderItem = (text, cl) => {
  const th = createElement('th', 'table-header__item');
  if(cl) {
    th.classList.add(cl);
  }
  th.textContent = text;
  th.setAttribute('tabindex', '0')

  return th;
}


const title = createElement('h1', 'title');
title.classList.add('reset');
title.textContent = 'Клиенты';

const tableWrapper = createElement('div', 'wrapper');
const table = createElement('table', 'table');
const thead = createElement('thead', 'table__info');
const tr = createElement('tr', 'table-header');
const tableId = createTableHeaderItem('ID', 'table-header__item--id');
const tableName = createTableHeaderItem('Фамилия Имя Отчество', 'table-header__item--name');
const tableDate = createTableHeaderItem('Дата и время создания', 'table-header__item--date');
const tableChanges = createTableHeaderItem('Последние изменения','table-header__item--changes' )
const tableContacts = createTableHeaderItem('Контакты');
const tableActions = createTableHeaderItem('Действия');

tableId.classList.add('table-header__item--arrow', 'active');
tableName.classList.add('table-header__item--arrow');
tableDate.classList.add('table-header__item--arrow');
tableChanges.classList.add('table-header__item--arrow');

tr.append(tableId, tableName, tableDate, tableChanges, tableContacts, tableActions);
thead.append(tr);
table.append(thead);
tableWrapper.append(table);

export {
  title, table, tableWrapper
}
