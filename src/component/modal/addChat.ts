import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/core/Block';
import { closeModal } from '../../utils/toggleModal';
import getInputsData from '../../utils/validate/getInputs';
import { inputIn, inputOut } from '../../utils/validate/inputValid';
import isAllValid from '../../utils/validate/isAllValid';
import Button from '../button/button';
import formTemplate from '../commonTmpl/form.tmpl';
import InputGroup from '../form/inputGroup';

export default class ChatModal extends Block {
  init() {
    (this.props.title = 'Введите название чата'),
      (this.props.containerClass = 'container container_big'),
    this.children.group_1 = new InputGroup({
      name: 'title',
      label: 'Название чата',
      inputClass: 'input',
      id: 'title',
      type: 'text',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
    });

    this.children.button_1 = new Button({
      text: 'Добавить чат',
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
    this.children.button_1.element?.classList.add('button');
    this.children.button_2.element?.classList.add(...['button', 'excretion-btn', 'navigation-btn']);
  }

  onChange() {
    function transformObject(data: Record<string, string>) {
      return {
        title: data.title,
      };
    }

    let title = transformObject(getInputsData());
    if (isAllValid(title)) {
      console.log(title);
      ChatsController.postChat(title);
      closeModal();
    }
  }

  render() {
    return this.compile(formTemplate, this.props);
  }
}
