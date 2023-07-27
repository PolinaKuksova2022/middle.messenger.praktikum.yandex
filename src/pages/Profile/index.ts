import Block from '../../utils/core/Block';
import template from './profile.tmpl';
import Button from '../../component/button/button';
import InputGroup from '../../component/form/inputGroup';
import { inputIn, inputOut } from '../../utils/validate/inputValid';
import editData from '../../utils/editData';
import { togglePassword } from '../../utils/toggleModal';
import AuthController from '../../controllers/AuthController';
import { State, withStore } from '../../utils/core/Store';
import router from '../../router/router';
import { Routes } from '../../main';
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
        click: () => {
          AuthController.logout();
        },
      },
    });
    this.children.button_4 = new Button({
      text: 'Вернуться к чатам',
      events: {
        click: () => {
          router.go(Routes.Chat);
        },
      },
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
      placeholder: '',
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
      placeholder: '',
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
      placeholder: '',
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
      placeholder: '',
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
      placeholder: '',
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
      placeholder: '',
      disabled: 'disabled',
    });

    this.children.button_1.element?.classList.add(...['button', 'modal-btn', 'navigation-btn']);
    this.children.button_2.element?.classList.add(...['button', 'modal-btn', 'navigation-btn']);
    this.children.button_3.element?.classList.add(...['button', 'excretion-btn', 'navigation-btn']);
    this.children.button_4.element?.classList.add('button');
    this.children.group_1.element?.classList.add('group-data');
    this.children.group_2.element?.classList.add('group-data');
    this.children.group_3.element?.classList.add('group-data');
    this.children.group_4.element?.classList.add('group-data');
    this.children.group_5.element?.classList.add('group-data');
    this.children.group_6.element?.classList.add('group-data');
  }

  componentDidMount(): void {
    AuthController.fetchUser();
  }

  render() {
    if (this.props) {
      (this.children.group_1 as Block).setProps({
        placeholder: this.props.email,
      });
      (this.children.group_2 as Block).setProps({
        placeholder: this.props.login,
      });
      (this.children.group_3 as Block).setProps({
        placeholder: this.props.first_name,
      });
      (this.children.group_4 as Block).setProps({
        placeholder: this.props.second_name,
      });
      (this.children.group_5 as Block).setProps({
        placeholder: this.props.display_name ? this.props.display_name : this.props.login,
      });
      (this.children.group_6 as Block).setProps({
        placeholder: this.props.phone,
      });
    }

    return this.compile(template, { ...this.props });
  }
}

function mapStateToProps(state: State) {
  console.log('{ ...state.user }', { ...state.user });
  return { ...state.user };
}

export const Profile = withStore(mapStateToProps)(BaseProfile);
