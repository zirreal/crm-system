import { showTable } from "./main";

const arraySortNames = (array) => {
    array.sort((a, b) => {
      const aName = `${a.lastName} ${a.name}  ${a.surname}`.toUpperCase();
      const bName = `${b.lastName} ${b.name}  ${b.surname}`.toUpperCase();

      if (aName < bName) {
        return -1;
      }
      if (aName > bName) {
        return 1;
      }

      return 0;
    });
    return array;
  }

const arraySortDate = (array, check) => {
    array.sort((a, b) => {
      let aDate;
      let bDate;

      if(check) {
        aDate = new Date(a.createdAt);
        bDate = new Date(b.createdAt);
      } else {
        aDate = new Date(a.updatedAt);
        bDate = new Date(b.updatedAt);
      }

      return aDate - bDate
    });
    return array;
  };

  const arraySortNumbers = (array) => {

    array.sort((a, b) => {
      const aId = a.id;
      const bId = b.id;
      return aId - bId;
    });
    return array;
  }


  const addSortedItems = (item, array, el) => {
    let reversedArray = array.slice().reverse();

    if (item.classList.contains('desc')) {
      item.classList.remove('desc');
      item.classList.add('asc');
      array = reversedArray;
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    } else if (item.classList.contains('asc')) {
      item.classList.remove('asc');
      item.classList.add('desc');
      while (el.firstChild) {
        el.removeChild(el.firstChild);
      }
    }

    showTable(array);

  }


export {arraySortNames, arraySortDate, addSortedItems, arraySortNumbers};
