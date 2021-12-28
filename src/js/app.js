import { getScroll, stopScroll } from "./helpers";

import createContactsItem from './components/contactsItem';
import spinnerWrapper from "./components/spinner";
import createError from "./components/error";
import { showTable } from "./main";

import { arraySortDate, arraySortNames, arraySortNumbers, addSortedItems } from "./filter";
import getAutocomplete from "./autocomplete";
import validateField from './validation';
import { checkName, checkEmail } from "./validateFields";

import getClients from './server/getClients';
import postClient from './server/postClient';
import deleteClient from './server/deleteClient';
import changeClient from './server/changeClient';

import choices from './vendor/choices.min.js';
import getTippy from "./libs";

let contacts = [];
const overlay = document.querySelector('.overlay');
const tbody = document.querySelector('.table-wrapper');
const modalAdd = document.querySelector('.modal-add');
const modalChange = document.querySelector('.modal-change');
const deleteModal = document.querySelector('.modal-delete');

const app = () => {

  const removeActiveModal = (modalEl) => {
    modalEl.classList.remove('active');
    overlay.classList.remove('open');
    getScroll();
  };
  
  const activeModal = (modalEl) => {
    const button = modalEl.querySelector('.modal-form__btn');
    button.disabled = true;
    if(modalEl.querySelector('input')) {
      modalFieldsChange(modalEl);
      deleteSelect(modalEl);
    }
    modalEl.classList.add('active');
    overlay.classList.add('open');
    stopScroll();

    modalEl.querySelector('.modal-form__btns').prepend(spinnerWrapper);
    modalEl.querySelector('.spin-wrapper').classList.add('hide');

    const labels = modalEl.querySelectorAll('.modal-form__label');
    labels.forEach(label => {
      label.classList.remove('modal-form__label-with-text');
    })
  }

  // получаем данные таблицы
  const getTable = async (url) => {
    await showTable(getClients(url));
    openChangeModal();
    showMoreContacts();
  }
  
  const checkError = () => {
    if(document.querySelector('.error')) {
      document.querySelectorAll('.error').forEach(item => {
        item.innerHTML = '';
        item.remove();
      })
    }

  };

  const deleteTooltips = (tooltips) => {
    tooltips.forEach(tooltip => {
      getTippy(tooltip, `Удалить контакт`)
    })
  }

  const changeContacts = () => {
    if(document.querySelector('.choices__item--selectable')) {
      const inputs = document.querySelectorAll('.modal-form__select-input');
      inputs.forEach((item, ind) => {
        item.addEventListener('change', (e) => {
          if(contacts.length === inputs.length) {
            contacts[ind].value = inputs[ind].value
          }
        })
      })
    }
  }

  // добавляем клиенту контакты
  const getContacts = () => {
    if(document.querySelector('.choices__item--selectable')) {
      const inputs = document.querySelectorAll('.modal-form__select-input');
      inputs.forEach(input => {
        input.addEventListener('blur', (e) => {
          const value = e.target.value;
          const type = e.target.parentElement.querySelector('.choices__item--selectable').textContent;
          const obj = {
            type: type,
            value: value
          } 
          if(value && type) {
            contacts.push(obj)
            const newArr = new Set();
            contacts = contacts.filter(el => {
              const duplicate = newArr.has(el.value);
              newArr.add(el.value);
              return !duplicate;
            });
          };
        })
  
        input.addEventListener('input', (e) => {
          const type = e.target.parentElement.querySelector('.choices__item--selectable').textContent;
          if(type === 'Телефон') {
            validateField(e.target, "+7 (999)-999-99-99");
          } else if(type === 'Email') {
            checkEmail(e.target, e.target);
          }
        })
      })
    }
  }
  
  const getSpinner = (modalEl) => {
    if(modalEl.querySelector('.spin-wrapper')) {
      modalEl.querySelector('.spin-wrapper').classList.remove('hide');
      modalEl.querySelector('.spin-wrapper').classList.add('spin-wrapper--for-button');
    }
  }

  const cleanInput = () => {
    document.querySelectorAll('.modal-form__input').forEach(input => {
      input.classList.remove('modal-form__input--error');
      input.value = '';
    })
  }

  const disableInputs = (name, lastName, middleName) => {
    name.disabled = true;
    lastName.disabled = true;
    middleName.disabled = true;
  }

  const enableInputs = (name, lastName, middleName) => {
    name.disabled = false;
    lastName.disabled = false;
    middleName.disabled = false;
  }

  const cleanContacts = (modalEl) => {
    if(modalEl.querySelector('.modal-form__add-contacts')) {
      modalEl.querySelector('.modal-form__add-contacts').innerHTML = '';
    }
  }
  
  // создаем поле для добавления контакта
  const showContactsField = (selector) => {
    const button = selector.querySelector('.modal-form__add-btn');
    const wrapper = selector.querySelector('.modal-form__add-contacts');
    let children = wrapper.children.length

    button.addEventListener('click', () => {
      if(wrapper.children.length <= 9) {
        wrapper.append(createContactsItem());
        if(wrapper.children.length !== children + 1) {
          wrapper.children[wrapper.children.length - 1].remove()
          children = wrapper.children.length
        }
        
      } else {
        button.classList.add('hide');
      }
      const elements = document.querySelectorAll(".selectCustom")
      elements.forEach(item => {
        const choice = new Choices(item, {
          searchEnabled: false,
          itemSelectText: "",
          shouldSort: false,
          position: "bottom",
        });
        choice.setValue(['Другое', 'Email', 'Vk', 'Facebook', 'Телефон']);
        const choicesAriaLabel = item.getAttribute("aria-label");
        item.closest(".choices").setAttribute("arial-label", choicesAriaLabel);
      });

      getContacts();
      deleteSelect(selector);
    });
  
  }

  // отправляем необходимый нам запрос на сервер и проверяем на ошибки 
  const doClientActions = async (url, modalEl, msg) => {
    if(modalEl.querySelector('input')) {
      disableInputs(modalEl.querySelector('.modal-form__input-name'), modalEl.querySelector('.modal-form__input-lastname'), modalEl.querySelector('.modal-form__input-middlename'))
    }
    getSpinner(modalEl);
    try {
      await url
      checkError();
      removeActiveModal(modalEl);
    } catch(err) {
      console.error(err.message);
      if(modalEl.querySelector('.modal-form__btns').children.length < 3) {
        modalEl.querySelector('.modal-form__btns').prepend(createError(msg))
      }
    }finally {
      getTable('https://zirreal-cmr-server.herokuapp.com/api/clients');
      if(modalEl.querySelector('.spin-wrapper')) {
        modalEl.querySelector('.spin-wrapper').classList.add('hide');
      }
      if(modalEl.querySelector('input')) {
        enableInputs(modalEl.querySelector('.modal-form__input-name'), modalEl.querySelector('.modal-form__input-lastname'), modalEl.querySelector('.modal-form__input-middlename'))
      }
    }
  }

    // показываем все контакты клиента, если их больше 4
  const showMoreContacts = () => {
    tbody.addEventListener('click', (e) => {
      if(e.target.classList.contains('table-wrapper__contacts-more-btn')) {
        e.target.previousElementSibling.style.display = 'flex'
        e.target.classList.add('hide')
      }
    })
  }
  
    // удаляем поле селекта
  const deleteSelect = (modal) => {

    modal.addEventListener('click', (e) => {
      if(e.target.classList.contains('modal-form__select-btn')) {
        const el = e.target.parentElement;
        const value = e.target.previousElementSibling.value;
        contacts = contacts.filter(item => item.value !== value)
        el.remove();
      }
    })

    modal.addEventListener('mouseover', (e) => {
      if(e.target.classList.contains('modal-form__select-btn')) {
        const deleteSelectBtns = modal.querySelectorAll('.modal-form__select-btn');
        deleteTooltips(deleteSelectBtns);
      }
    })
  }
  
  // добавляем клиента
  const addClient = () => {
    const name = modalAdd.querySelector('.modal-form__input-name');
    const lastName = modalAdd.querySelector('.modal-form__input-lastname');
    const middleName = modalAdd.querySelector('.modal-form__input-middlename')
    const client = {
      name: name.value,
      surname: middleName.value,
      lastName: lastName.value,
      contacts: contacts,
    }

    disableInputs(name, lastName, middleName)
    getSpinner(modalAdd);
    postClient('https://zirreal-cmr-server.herokuapp.com/api/clients', client)
      .then(data => {
        removeActiveModal(modalAdd);
      }).catch((err) => {
        checkError();
        console.error(err.message);
        modalAdd.querySelector('.modal-form__btns').prepend(createError('Произошла ошибка. Не удалось добавить контакт'))
        enableInputs(name, lastName, middleName)
      }).finally(() => {
        modalAdd.querySelector('.spin-wrapper').classList.add('hide');
        document.querySelector('.modal-form').reset();
        getTable('https://zirreal-cmr-server.herokuapp.com/api/clients');
        enableInputs(name, lastName, middleName)
      });

      contacts = [];
  };

  // подтверждаем удаление
  const deleteInfo = (btn, id) => {
    btn.addEventListener('click', () => {
      checkError();
      doClientActions(deleteClient(`https://zirreal-cmr-server.herokuapp.com/api/clients/${id}`), deleteModal, 'Произошла ошибка. Не удалось удалить контакт');
      id = '';
    })
  };
  
  // удаляем клиента
  const handleDelete =  () => {
    const confirmButton = document.querySelector('.modal-form__btn--delete');
    const deleteSecondaryBtn = modalChange.querySelector('.modal-form__btn--secondary');

    tbody.addEventListener('click', (e) => {
      if(e.target.classList.contains('table-wrapper__btn--delete')) {
        activeModal(deleteModal)
        confirmButton.disabled = false;
        const el = e.target.parentElement.parentElement;
        const id = el.querySelector('.table-wrapper__id').textContent; 
        deleteInfo(confirmButton, id);
      }
    })

    deleteSecondaryBtn.addEventListener('click',  (e) => {
      modalChange.classList.remove('active');
      activeModal(deleteModal)
      confirmButton.disabled = false;
      const el = e.target.parentElement.parentElement.parentElement;
      const id = el.querySelector('.modal__title--id').textContent.replace(/[^0-9]/g,'');  
      deleteInfo(confirmButton, id);
    });
  
  }
  
  // изменяем информацию о клиенте
  const changeInfo = async (e) => {
    const modal = document.querySelector('.modal-change')
    const button = modal.querySelector('.modal-form__btn--change');
    const el = e.target.parentElement.parentElement;
    const labels = modal.querySelectorAll('.modal-form__label');
    const idText = modal.querySelector('.modal__title--id');
    const name = modal.querySelector('.modal-form__input-name');
    const lastName = modal.querySelector('.modal-form__input-lastname');
    const middleName = modal.querySelector('.modal-form__input-middlename');
    let id = el.querySelector('.table-wrapper__id').textContent;
    let client ;
    let choice ;
    disableInputs(name, lastName, middleName)

    try {
      client = await getClients(`https://zirreal-cmr-server.herokuapp.com/api/clients/${id}`);
      enableInputs(name, lastName, middleName)

      checkError();

      idText.textContent = ` ID: ${client.id}`
      name.value = client.name;
      lastName.value = client.lastName;
      middleName.value = client.surname; 
      button.disabled = false;

    } catch(err) {
      console.log(err.message);
      modal.querySelector('.modal-form__btns').prepend(createError(msg))
      disableInputs(name, lastName, middleName)
    }
  
    labels.forEach(label => {
      label.classList.add('modal-form__label-with-text');
    })
  
    const checkContacts = () => {
      contacts = client.contacts
      // удаляем дублирующиеся контакты
      const newArr = new Set();
      client.contacts = client.contacts.filter(el => {
        const duplicate = newArr.has(el.value);
        newArr.add(el.value);
        return !duplicate;
      });

      if(client.contacts.length) {
        client.contacts.map(contact => {
          const wrapper = modal.querySelector('.modal-form__add-contacts');
          if( wrapper.children.length <= client.contacts.length - 1) {
            wrapper.append(createContactsItem());
          } 
          const inputs = modal.querySelectorAll('.modal-form__select-input');
          if(inputs.length === client.contacts.length ) {
            inputs.forEach((input, index) => {
              inputs[index].value = client.contacts[index].value;
              input.addEventListener('blur', () => {
                if(!inputs[index].value) {
                  button.disabled = true;
                } else {
                  button.disabled = false;
                }
              })

            })
          }
          const elements = document.querySelectorAll(".selectCustom")
          elements.forEach(item => {
            choice = new Choices(item, {
              searchEnabled: false,
              itemSelectText: "",
              shouldSort: false,
              position: "bottom",
            });
            choice.setValue([contact.type]);
            const choicesAriaLabel = item.getAttribute("aria-label");
            item.closest(".choices").setAttribute("arial-label", choicesAriaLabel);
          })

        });
  
        changeContacts();

      }
    };

    checkContacts();
    showContactsField(modal)
    
    
    button.addEventListener('click', () => {
      const newClient = {
        name: name.value,
        lastName: lastName.value,
        surname: middleName.value,
        contacts: contacts,
      }
      doClientActions(changeClient(`https://zirreal-cmr-server.herokuapp.com/api/clients/${id}`, newClient), modalChange, 'Произошла ошибка. Не удалось изменить контакт');
      checkError();
      id = '';
      modal.querySelector('.modal-form__add-contacts').innerHTML = '';
    });
  
  }

  // проверяем данные в инпутах
  const modalFieldsChange = (modalEL) => {
    const modalInputs = modalEL.querySelectorAll('.modal-form__input');
    const lastname = modalEL.querySelector('.modal-form__input-lastname');
    const name = modalEL.querySelector('.modal-form__input-name');
    modalInputs.forEach(item => {
      item.addEventListener('input', (e) => {
        checkName(item)
        if(e.target.value) {
          e.target.nextElementSibling.classList.add('modal-form__label-with-text')
        } else {
          e.target.nextElementSibling.classList.remove('modal-form__label-with-text')
        }
      });
    })
    checkName(lastname);
    checkName(name);
  }

  // проверяем, что имя и фамилия не пустые
  const checkNameValue = (modalEL) => {
    const name = modalEL.querySelector('.modal-form__input-name')
    const lastname = modalEL.querySelector('.modal-form__input-lastname')
    const btn = modalEL.querySelector('.modal-form__btn')
    const inputs = modalEL.querySelectorAll('.modal-form__input') 

    btn.disabled = true
    

    inputs.forEach(item => {
      item.addEventListener('input', () => {
        if(name.value && lastname.value) {
          btn.disabled = false
        } else {
          btn.disabled = true
        }
      })
    })
  }
  
  // добавляем сортировку таблицы
  const addFilter = async () => {
    const all = document.querySelectorAll('.table-header__item--arrow');
    const id = document.querySelector('.table-header__item--id');
    const name = document.querySelector('.table-header__item--name');
    const date = document.querySelector('.table-header__item--date');
    const changes = document.querySelector('.table-header__item--changes');
  
    const data = await getClients('https://zirreal-cmr-server.herokuapp.com/api/clients');
  
    const createFilter = (value) => {
      removeActiveFilter()
      addSortedItems(value, data, tbody);
      value.classList.add('active');
      openChangeModal();
      showMoreContacts();
    }
  
    all.forEach(i => {
      i.classList.add('desc');
    });
  
    const removeActiveFilter = () => {
      all.forEach(i => {
        i.classList.remove('active');
      });
    }
  
    id.addEventListener('click', () => {
      createFilter(id);
      arraySortNumbers(data);
    })
  
    name.addEventListener('click', () => {
      createFilter(name);
      arraySortNames(data);
    });
  
    date.addEventListener('click', () => {
      createFilter(date)
      arraySortDate(data, true);
    });
  
    changes.addEventListener('click', () => {
      createFilter(changes)
      arraySortDate(data);
    })
  }
  // поиск клиента
  const useSearch = async () => {
    const data = await getClients(`https://zirreal-cmr-server.herokuapp.com/api/clients`);
    const search = document.querySelector('.header__search-input');

    const activateSearch = (value) => {
      setTimeout(async () => {
        const dataSearch = await getClients(`https://zirreal-cmr-server.herokuapp.com/api/clients?search=${value}`);
        if(dataSearch.length) {
          showTable(dataSearch);
          openChangeModal();
        } else {
          tbody.innerHTML = '';
          tbody.append(createError('Не удалось найти клиента'))
          tbody.querySelector('.error').classList.add('error-center');
        }
      }, 300)
    }
  
    search.addEventListener('blur', () => {
      if(!search.value) {
        showTable(data);
      } else {
        activateSearch(search.value)
      }
    })

    search.addEventListener('keydown', () => {
      if(search.value) {
        activateSearch(search.value)
      }
    })
  
    search.addEventListener('input', () => {
      const value = search.value;
      if(!value) {
        showTable(data);
        openChangeModal();
      } else {
        activateSearch(value)
      };
    });
  }

  // добавляем автопоиск
  const activateAutocomplete = async () => {
    let data = await getClients(`https://zirreal-cmr-server.herokuapp.com/api/clients`);
    const search = document.querySelector('.header__search-input');
    const block = document.querySelector('.header__search');
    data = data.map(item => {
      return `${item.lastName} ${item.name} ${item.surname}` 
    })
    getAutocomplete(search, data, block)
  }
  
  const onSaveModal = () => {
    const btn =  document.querySelector('.modal-form__btn--save');
    btn.addEventListener('click', (e) => {
      checkError();
      addClient();
    })
  }

  const openChangeModal = () => {

    tbody.addEventListener('click', (e) => {
      if(e.target.classList.contains('table-wrapper__btn--change')) {
        const button = modalChange.querySelector('.modal-form__add-btn');
        button.classList.remove('hide');
        changeInfo(e);
        activeModal(modalChange)
      }
    })
    
    modalFieldsChange(modalChange);
  }
  
  const openModal = (selector, el) => {
    document.querySelector(selector).addEventListener('click', () => {
      activeModal(el)
    })
    showContactsField(el);
  };
  
  const closeModal = (selector, modalEl) => {
    modalEl.querySelector(selector).addEventListener('click', () => {
      removeActiveModal(modalEl);
      checkError();
      cleanContacts(modalEl)
      cleanInput()
    })
    overlay.addEventListener('click', () => {
      cleanContacts(modalEl)
      removeActiveModal(modalEl);
      checkError();
      cleanInput()
    })
  
    modalAdd.querySelector('.modal-form__btn--secondary').addEventListener('click', () => {
        removeActiveModal(modalEl);
        checkError();
        cleanContacts(modalAdd)
        cleanInput()
    });
  
    deleteModal.querySelector('.modal-form__btn--secondary').addEventListener('click', () => {
      removeActiveModal(modalEl);
      checkError();
      cleanContacts(deleteModal);
      cleanInput();
  });
  };

  const handleFormSubmit = () => {
    const forms = document.querySelectorAll('.modal-form');
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
      })
    })
  
  };
  
  openModal('.add-button', modalAdd);
  closeModal('.modal__close-btn', modalAdd);
  closeModal('.modal__close-btn', modalChange);
  closeModal('.modal__close-btn', deleteModal);
  openChangeModal();
  checkNameValue(modalAdd)
  checkNameValue(modalChange)
  handleFormSubmit();
  onSaveModal();
  addFilter();
  useSearch();
  activateAutocomplete();
  handleDelete();
  showMoreContacts();
};

app();

