import UserController from '../../controllers/UserController';
import Block from '../../utils/core/Block';
import store, { withStore } from '../../utils/core/Store';
import { closeModal } from '../../utils/toggleModal';
import getInputsData from '../../utils/validate/getInputs';
import { inputIn, inputOut } from '../../utils/validate/inputValid';
import isAllValid from '../../utils/validate/isAllValid';
import Button from '../button/button';
import formTemplate from '../commonTmpl/form.tmpl';
import InputGroup from '../form/inputGroup';
class PasswordBase extends Block {
  init() {
    this.props.title = 'Измените пароль',
    this.props.containerClass = 'container container_big',
    
    this.children.group_1 = new InputGroup({
        name: 'oldPassword',
        label: 'Старый пароль',
        inputClass: 'input',
        id: 'password-old',
        type: 'password',
        events: {
          focusout: (event) => inputOut(event),
          focusin: (event) => inputIn(event),
        },
    });
    this.children.group_2 = new InputGroup({
      name: 'newPassword',
      label: 'Новый пароль',
      inputClass: 'input',
      id: 'password',
      type: 'password',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
    });

    this.children.group_3 = new InputGroup({
      name: 'newPassword',
      label: 'Повторите новый пароль',
      inputClass: 'input',
      id: 'password-2',
      type: 'password',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
    });

    this.children.button_1 = new Button({
      text: 'Поменять',
      id: 'change',
      events: {
        click: (e) => {
          e.preventDefault();
          this.onChange();
        },
      },
    });
    this.children.button_2 = new Button({
      text: 'Закрыть',
      events: {
        click: () => {
          closeModal();
        },
      },
    });

    this.children.group_1.element?.classList.add('input-group');
    this.children.group_2.element?.classList.add('input-group');
    this.children.group_3.element?.classList.add('input-group');
    this.children.button_1.element?.classList.add(...['button', 'disabled']);
    this.children.button_2.element?.classList.add(...['button', 'excretion-btn', 'navigation-btn']);
  }

  onChange() {
    function transformObject(data: Record<string, string>) {
      return {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      };
    }

    let data = getInputsData();

    data = transformObject(data);

    if (isAllValid(data)) {
      console.log(data);
      UserController.putPassword(data);

      console.log('при изменении пароля', store.state);
    }
  }

  render() {
    return this.compile(formTemplate, this.props);
  }
}

export const Password = withStore((state) => state.user)(PasswordBase);
