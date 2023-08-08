import ChatsController from '../../controllers/ChatsController';
import UserController from '../../controllers/UserController';
import Block from '../../utils/core/Block';
import store from '../../utils/core/Store';
import { closeModal } from '../../utils/toggleModal';
import Button from '../button/button';
import formTemplate from '../commonTmpl/form.tmpl';
import InputGroup from '../form/inputGroup';

export default class Photo extends Block {
  init() {
    this.props.title = 'Загрузите файл';
    this.props.containerClass = 'container container_big';

    this.children.group_1 = new InputGroup({
      name: '',
      id: 'avatar',
      type: 'file',
      value: 'Выбрать файл на компьютере',
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
    this.children.button_1.element?.classList.add('button');
    this.children.button_2.element?.classList.add(...['button', 'excretion-btn', 'navigation-btn']);
  }

  onChange() {
    const inputElement = <HTMLInputElement>document.getElementById('avatar');

    if (!inputElement.files) return;

    const formData = new FormData();
    formData.append('avatar', inputElement.files[0]);

    if (window.location.pathname === '/settings') {
      UserController.putAvatar(formData);
    } else if (store.state.activeChat) {
      formData.append('chatId', String(store.state.activeChat.id));
      ChatsController.putAvatarToChat(formData);
    }
  }

  render() {
    return this.compile(formTemplate, this.props);
  }
}
