import Block from '../../utils/core/Block';
import template from './profile.tmpl';
import Button from '../../component/button/button';
import InputGroup from '../../component/form/inputGroup';
import { inputIn, inputOut } from '../../utils/validate/inputValid';
import editData from '../../utils/editData';
import { togglePassword } from '../../utils/toggleModal';
import AuthController from '../../controllers/AuthController';
import { State, withStore } from '../../utils/core/Store';
export class BaseProfile extends Block {
  init() {
    this.children.button_1 = new Button({
      text: 'Изменить данные',
      events: {
        click: (e) => {
          e.preventDefault();
          editData(e);
        },
      },
    });
    this.children.button_2 = new Button({
      text: 'Изменить пароль',
      id: 'password',
      events: {
        click: (e) => {
          e.preventDefault();
          togglePassword();
        },
      },
    });
    this.children.button_3 = new Button({
      text: 'Выйти',
      events: {
        click: () => { AuthController.logout(); }
      }
    });

    this.children.group_1 = new InputGroup({
      name: 'email',
      label: 'Почта',
      inputClass: 'group-data__value',
      id: 'email',
      type: 'email',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: 'pochta@yandex.ru',
      disabled: 'disabled',
    });
    this.children.group_2 = new InputGroup({
      name: 'login',
      label: 'Логин',
      inputClass: 'group-data__value',
      id: 'login',
      type: 'text',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: 'ivanivanov',
      disabled: 'disabled',
    });
    this.children.group_3 = new InputGroup({
      name: 'first_name',
      label: 'Имя',
      inputClass: 'group-data__value',
      id: 'first_name',
      type: 'text',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: 'Иван',
      disabled: 'disabled',
    });
    this.children.group_4 = new InputGroup({
      name: 'second_name',
      label: 'Фамилия',
      inputClass: 'group-data__value',
      id: 'second_name',
      type: 'text',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: 'Иванов',
      disabled: 'disabled',
    });
    this.children.group_5 = new InputGroup({
      name: 'display_name',
      label: 'Имя в чате',
      inputClass: 'group-data__value',
      id: 'display_name',
      type: 'text',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: 'Иван',
      disabled: 'disabled',
    });
    this.children.group_6 = new InputGroup({
      name: 'phone',
      label: 'Телефон',
      inputClass: 'group-data__value',
      id: 'phone',
      type: 'tel',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: '+7 (909) 967 30 30',
      disabled: 'disabled',
    });

    this.children.button_1.element?.classList.add(...['button', 'modal-btn', 'navigation-btn']);
    this.children.button_2.element?.classList.add(...['button', 'modal-btn', 'navigation-btn']);
    this.children.button_3.element?.classList.add(...['button', 'excretion-btn', 'navigation-btn']);
    this.children.group_1.element?.classList.add('group-data');
    this.children.group_2.element?.classList.add('group-data');
    this.children.group_3.element?.classList.add('group-data');
    this.children.group_4.element?.classList.add('group-data');
    this.children.group_5.element?.classList.add('group-data');
    this.children.group_6.element?.classList.add('group-data');
  }

  componentDidMount(): void {
    console.log('1');
    AuthController.fetchUser();
    console.log('2');
  }

  render() {
    return this.compile(template, {func: 'window.togglePhoto()' });
  }
}

function mapStateToProps(state: State) {

  console.log("{ ...state.user }" ,{ ...state.user });
  return { ...state.user };
}

export const Profile = withStore(mapStateToProps)(BaseProfile);
