import mail from '../../img/mail.svg';
import phone from '../../img/phone.svg';
import fb from '../../img/fb.svg';
import vk from '../../img/vk.svg';
import contact from '../../img/person.svg';
import { createElement} from '../helpers';
import getMoreButton from './contactsMoreButton';

const getImages = (contacts) => {
  const imgsWrapper = createElement('div', 'table-wrapper__contacts-images')
  const div = createElement('div', 'table-wrapper__contacts-img-block');
  let image ;


  // удаляем дублирующиеся контакты
  const newArr = new Set();
  contacts = contacts.filter(el => {
    const duplicate = newArr.has(el.value);
    newArr.add(el.value);
    return !duplicate;
  });


  const checkType = (item) => {
    switch(item.type) {
      case 'Телефон':
        image = createElement('img','table-wrapper__contacts-img');
        image.setAttribute('data-value', item.value)
        image.setAttribute('data-type', item.type)
        image.src = phone;
        image.alt = 'phone'
        break;
      case 'Email':
        image =  createElement('img','table-wrapper__contacts-img');
        image.setAttribute('data-value', item.value)
        image.setAttribute('data-type', item.type)
        image.src = mail;
        image.alt = 'email'
        break;
      case 'Vk':
        image = createElement('img','table-wrapper__contacts-img');
        image.setAttribute('data-value', item.value)
        image.setAttribute('data-type', item.type)
        image.src = vk;
        image.alt = 'vk'
        break;
      case 'Facebook':
        image = createElement('img','table-wrapper__contacts-img');
        image.setAttribute('data-value', item.value)
        image.setAttribute('data-type', item.type)
        image.src = fb
        image.alt = 'facebook'
        break;
      default:
        image = createElement('img','table-wrapper__contacts-img');
        image.setAttribute('data-value', item.value)
        image.setAttribute('data-type', item.type)
        image.src = contact;
        image.alt = 'contacts'
    };
  }

  if(contacts.length > 1) {
    const btn = getMoreButton(imgsWrapper.children.length);
    for( const contact of contacts) {
      checkType(contact);
      imgsWrapper.append(image);
      if(imgsWrapper.children.length > 4) {
        imgsWrapper.append(div);
        div.append(image) 
        imgsWrapper.append(btn);
        btn.textContent = `+${div.children.length}`;
      }
    }
    return imgsWrapper.outerHTML
  } else if(contacts.length === 1) {
    checkType(contacts[0])
    return image.outerHTML
  }

};

export default getImages;
