import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/core/Block';
import { State, withStore } from '../../utils/core/Store';
import { closeModal } from '../../utils/toggleModal';
import getInputsData from '../../utils/validate/getInputs';
import { inputIn, inputOut } from '../../utils/validate/inputValid';
import isAllValid from '../../utils/validate/isAllValid';
import Button from '../button/button';
import formTemplate from '../commonTmpl/form.tmpl';
import InputGroup from '../form/inputGroup';

class BaseChangeChat extends Block {
  init() {
    (this.props.title = 'Редактировать чат'),
      (this.props.containerClass = 'container container_big'),
      (this.children.group_1 = new InputGroup({
        name: 'userId',
        label: 'Введите id пользователя',
        inputClass: 'input',
        id: 'userId',
        type: 'text',
        events: {
          focusout: (event) => inputOut(event),
          focusin: (event) => inputIn(event),
        },
      }));
    this.children.button_1 = new Button({
      text: 'Добавить пользователя',
      id: 'change',
      events: {
        click: (e) => {
          e.preventDefault();
          this.addUser();
          // const user = document.getElementsByName('login')[0];
          // console.log(user);
          // ChatsController.putAddUserToChat(this.props.id)
        },
      },
    });
    this.children.button_2 = new Button({
      text: 'Удалить пользователя',
      events: {
        click: () => {
          console.log(this.props);
        },
      },
    });
    this.children.button_3 = new Button({
      text: 'Удалить чат',
      events: {
        click: (e) => {
          e.preventDefault();
          ChatsController.deleteChat({ chatId: this.props.activeChat.id });
          closeModal();
        },
      },
    });
    this.children.button_4 = new Button({
      text: 'Закрыть',
      events: {
        click: () => {
          closeModal();
        },
      },
    });

    this.children.group_1.element?.classList.add('input-group');
    this.children.button_1.element?.classList.add('button');
    this.children.button_2.element?.classList.add(...['button', 'modal-btn', 'navigation-btn']);
    this.children.button_3.element?.classList.add(...['button', 'modal-btn', 'navigation-btn']);
    this.children.button_4.element?.classList.add(...['button', 'excretion-btn', 'navigation-btn']);
  }

  addUser() {
    if (isAllValid({ userId: getInputsData().userId })) {
      ChatsController.putAddUserToChat({
        users: [getInputsData().userId],
        chatId: this.props.activeChat.id,
      });
      closeModal();
    }
  }

  render() {
    return this.compile(formTemplate, this.props);
  }
}

function mapStateToProps(state: State) {
  return { chats: state.chats, activeChat: state.activeChat, user: state.user };
}

export const ChangeChat = withStore(mapStateToProps)(BaseChangeChat);
