const createTableItem = (id, name, lastName, middleName, date, time, changesDate, changesTime, contacts) => {

  const tableBody =
    `<tr>
      <th class="table-wrapper__item table-wrapper__id">${id}</th>
      <td class="table-wrapper__item table-wrapper__name">${lastName} ${name} ${middleName}</td>
      <td class="table-wrapper__item table-wrapper__date">${date} <span class="table-wrapper__time">${time}</span></td>
      <td class="table-wrapper__item table-wrapper__changes">${changesDate} <span class="table-wrapper__time">${changesTime}</span></td>
      <td class="table-wrapper__item table-wrapper__contacts">
        ${contacts}
      </td>
      <td class="table-wrapper__item table-wrapper__actions">
        <button class="reset table-wrapper__btn table-wrapper__btn--change">Изменить</button>
        <button class="reset table-wrapper__btn table-wrapper__btn--delete">Удалить</button>
      </td>
    </tr>`; 
  
    return tableBody;
}

export default createTableItem;

