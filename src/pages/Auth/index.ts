import Block from '../../utils/core/Block';
import formTemplate from '../../component/commonTmpl/form.tmpl';
import InputGroup from '../../component/form/inputGroup';
import Button from '../../component/button/button';
import buttonValid from '../../utils/validate/buttonValid';
import { inputIn, inputOut } from '../../utils/validate/inputValid';
import router from '../../router/router';

export default class Auth extends Block {
  init() {
    this.children.button_1 = new Button({
      text: 'Авторизация',
      events: {
        click: (e) => {
          e.preventDefault();
          buttonValid();
        },
      },
    });
    this.children.button_2 = new Button({
      text: 'Нет аккаунта?',
      events: {
        click: () => {
          router.go('/registration');
        },
      },
      // path: '/registration',
    });

    this.children.group_1 = new InputGroup({
      name: 'login',
      label: 'Логин',
      inputClass: 'input',
      id: 'login',
      type: 'text',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: '',
    });

    this.children.group_2 = new InputGroup({
      name: 'password',
      label: 'Пароль',
      inputClass: 'input',
      id: 'password',
      type: 'password',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: '',
    });

    this.children.button_1.element?.classList.add(...['button', 'disabled']);
    this.children.button_2.element?.classList.add(...['button', 'navigation-btn']);
    this.children.group_1.element?.classList.add('input-group');
    this.children.group_2.element?.classList.add('input-group');
  }

  render() {
    return this.compile(formTemplate, { title: 'Авторизация', containerClass: 'container' });
  }
}
