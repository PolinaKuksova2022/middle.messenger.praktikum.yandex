import Block from '../../utils/core/Block';
import formTemplate from '../../component/commonTmpl/form.tmpl';
import InputGroup from '../../component/form/inputGroup';
import Button from '../../component/button/button';
import { inputIn, inputOut } from '../../utils/validate/inputValid';
import router from '../../router/router';
import AuthController from '../../controllers/AuthController';
import isAllValid from '../../utils/validate/isAllValid';
import getInputsData from '../../utils/validate/getInputs';
export default class Registration extends Block {
  init() {
    this.props.title = 'Регистрация',
    this.props.containerClass =  'container container_big',
    
    this.children.button_1 = new Button({
      text: 'Зарегистрироваться',
      events: {
        click: (e) => {
          e.preventDefault();
          this.onSubmit();
        },
      },
    });
    this.children.button_2 = new Button({
      text: 'Войти',
      events: {
        click: () => {
          router.go('/profile');
        },
      },
    });

    this.children.group_1 = new InputGroup({
      name: 'email',
      label: 'Почта',
      inputClass: 'input',
      id: 'mail',
      type: 'text',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: 'pochta@yandex.ru',
    });
    this.children.group_2 = new InputGroup({
      name: 'login',
      label: 'Логин',
      inputClass: 'input',
      id: 'login',
      type: 'text',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: 'ivanivanov',
    });
    this.children.group_3 = new InputGroup({
      name: 'first_name',
      label: 'Имя',
      inputClass: 'input',
      id: 'username',
      type: 'text',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: 'Иван',
    });
    this.children.group_4 = new InputGroup({
      name: 'second_name',
      label: 'Фамилия',
      inputClass: 'input',
      id: 'usersurname',
      type: 'text',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: 'Иванов',
    });
    this.children.group_5 = new InputGroup({
      name: 'phone',
      label: 'Телефон',
      inputClass: 'input',
      id: 'phone',
      type: 'tel',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: '+7(___)-___-__-__',
    });
    this.children.group_6 = new InputGroup({
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

    this.children.group_7 = new InputGroup({
      name: 'password',
      label: 'Повторите пароль',
      inputClass: 'input',
      id: 'password-2',
      type: 'password',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: '',
    });

    this.children.button_1.element?.classList.add(...['button', 'disabled']);
    this.children.button_2.element?.classList.add(...['button', 'navigation-btn']);
    this.children.button_2.element?.setAttribute('type', 'button');
    this.children.group_1.element?.classList.add('input-group');
    this.children.group_2.element?.classList.add('input-group');
    this.children.group_3.element?.classList.add('input-group');
    this.children.group_4.element?.classList.add('input-group');
    this.children.group_5.element?.classList.add('input-group');
    this.children.group_6.element?.classList.add('input-group');
    this.children.group_7.element?.classList.add('input-group');
  }

  onSubmit() {
    const data = getInputsData();
    if (isAllValid(data)) {
      console.log(data, 'Registration(signup) data');

      AuthController.signup(data);
    }
  }

  render() {
    return this.compile(formTemplate, {...this.props});
  }
}
