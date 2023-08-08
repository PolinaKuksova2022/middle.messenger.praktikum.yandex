import Block from '../../utils/core/Block';
import Button from '../../component/button/button';
import template from './chats.tmpl';
import Dialogue from '../../component/dialogue/dialogue';
import ActiveChat from '../../component/activeChat/activeChat';
import router from '../../router/router';
import store, { State, withStore } from '../../utils/core/Store';
import ChatsController from '../../controllers/ChatsController';
import { toggleChatModal } from '../../utils/toggleModal';
import isEqual from '../../utils/isEqual';
import { IChat } from '../../api/chats-api';
import Routes from '../../main';

class BaseChats extends Block {
  init() {
    this.children.button_1 = new Button({
      text: 'Профиль >',
      events: {
        click: () => {
          router.go(Routes.Profile);
          store.set('activeChat', undefined);
        },
      },
    });
    this.children.button_2 = new Button({
      text: 'Создать чат',
      events: {
        click: () => {
          toggleChatModal();
          store.set('activeChat', undefined);
        },
      },
    });

    this.children.activeChat = new ActiveChat({});

    this.children.button_1.element?.classList.add(...['button', 'chats-btn']);
    this.children.button_2.element?.classList.add('button');
    this.children.activeChat.element?.classList.add('active-chat');
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (!isEqual(oldProps, newProps) && this.props.chats && this.props.chats.length > 0) {
      this.renderChats();
    }

    return !isEqual(oldProps, newProps);
  }

  renderChats() {
    this.children.chatList = this.props.chats.map(
      (chat: IChat) =>
        new Dialogue({
          events: {
            click: () => {
              ChatsController.fetchChatUsers(chat.id);
              store.set('activeChat', chat);
            },
          },
          id: +chat.id,
          name: chat.title,
          classTitle: 'dialogue__author',
          author: '',
          avatarImg: chat.avatar,
        })
    );
  }

  render() {
    ChatsController.fetchChats();

    if (this.props.chats && this.props.chats.length > 0) {
      this.renderChats();
    }
    return this.compile(template, this.props);
  }
}

function mapStateToProps(state: State) {
  return { chats: state.chats, activeChat: state.activeChat };
}

const Chats = withStore(mapStateToProps)(BaseChats);

export default Chats;
