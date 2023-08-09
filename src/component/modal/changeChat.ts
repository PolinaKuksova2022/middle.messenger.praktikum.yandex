import { IUser } from '../../api/auth-api';
import ChatsController from '../../controllers/ChatsController';
import Block from '../../utils/core/Block';
import store, { State, withStore } from '../../utils/core/Store';
import isEqual from '../../utils/isEqual';
import { closeModal } from '../../utils/toggleModal';
import getInputsData from '../../utils/validate/getInputs';
import { inputIn, inputOut } from '../../utils/validate/inputValid';
import isAllValid from '../../utils/validate/isAllValid';
import Button from '../button/button';
import formTemplate from '../commonTmpl/form.tmpl';
import InputGroup from '../form/inputGroup';

class BaseChangeChat extends Block {
  init() {
    this.props.title = 'Редактировать чат';
    this.props.containerClass = 'container container_big';

    this.children.group_1 = new InputGroup({
      name: 'userId',
      label: 'Введите id пользователя',
      inputClass: 'input',
      id: 'userId',
      type: 'text',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
    });
    this.children.button_1 = new Button({
      text: 'Добавить пользователя',
      id: 'change',
      events: {
        click: (e) => {
          e.preventDefault();
          this.addUser();
        },
      },
    });
    this.children.button_2 = new Button({
      text: 'Удалить пользователя',
      events: {
        click: (e) => {
          e.preventDefault();
          this.deleteUser();
        },
      },
    });
    this.children.button_3 = new Button({
      text: 'Удалить чат',
      events: {
        click: (e) => {
          e.preventDefault();
          ChatsController.deleteChat({ chatId: this.props.activeChat.id });
          store.set('activeChat', undefined);
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

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    return !isEqual(oldProps, newProps);
  }

  async addUser() {
    const { userId } = getInputsData();

    if (this.props.activeChatUsers.find((i: IUser) => i.id === +userId)) {
      alert(`${userId} уже есть в этом чате`);
      closeModal();
    } else if (isAllValid({ userId })) {
      ChatsController.putAddUserToChat({
        users: [userId],
        chatId: this.props.activeChat.id,
      });
      closeModal();
    }
  }

  deleteUser() {
    const { userId } = getInputsData();
    if (isAllValid({ userId })) {
      ChatsController.deleteUserFromChat({
        users: [userId],
        chatId: this.props.activeChat.id,
      });
      closeModal();
    }
  }

  render() {
    return this.compile(formTemplate, { ...this.props });
  }
}

function mapStateToProps(state: State) {
  return {
    activeChatUsers: state.activeChatUsers,
    activeChat: state.activeChat,
  };
}

const ChangeChat = withStore(mapStateToProps)(BaseChangeChat);

export default ChangeChat;
