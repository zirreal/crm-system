import { createElement } from "../helpers";
import mail from '../../img/mail.svg';
import phone from '../../img/phone.svg';
import facebook from '../../img//fb.svg';
import vk from '../../img/vk.svg';
import icon from '../../img/person.svg';
import getClients from "../server/getClients";


const getContactsInfo = async () => {
  const data = await getClients('https://zirreal-cmr-server.herokuapp.com/clients');
  data.map(item => {
    if(item.contacts.length){
      console.log(item.contacts);
    }    
  })


  const imgWrapper = createElement('div', 'table-wrapper__contacts-wrapper-img')
    const createImg = createElement('img', 'table-wrapper__contacts-img');

    const checkType = (type) => {
      switch(type) {
        case 'Телефон': 
          createImg.src = phone;
          createImg.alt = 'phone'
          console.log(createImg);
          imgWrapper.append(createImg);
          return createImg;
        case 'Facebook': 
          createImg.src = facebook;
          createImg.alt = 'facebook';
          console.log(createImg);
          imgWrapper.append(createImg);
          return createImg;
        case 'Vk': 
          createImg.src = vk;
          createImg.alt = 'vk';
          console.log(createImg);
          imgWrapper.append(createImg);
          return createImg;
        case 'Email':
          createImg.src = mail;
          createImg.alt = 'mail';
          console.log(createImg);
          imgWrapper.append(createImg);
          return createImg;
        default:
          createImg.src = icon;
          createImg.alt = 'contact';
          console.log(createImg);
          imgWrapper.append(createImg); 
          return createImg;
      }
    }
}

getContactsInfo();



