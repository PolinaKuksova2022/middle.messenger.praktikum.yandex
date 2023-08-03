import Block from '../../utils/core/Block';
import Button from '../../component/button/button';
import template from './chats.tmpl';
import Dialogue from '../../component/dialogue/dialogue';
import { ActiveChat } from '../../component/message/activeChat';
import router from '../../router/router';
import store, { State, withStore } from '../../utils/core/Store';
import ChatsController from '../../controllers/ChatsController';
import WSControllers from '../../controllers/WSControllers';
import { toggleChatModal } from '../../utils/toggleModal';
import isEqual from '../../utils/isEqual';
import { IChat } from '../../api/chats-api';

class BaseChats extends Block {
  init() {
    this.children.button_1 = new Button({
      text: 'Профиль >',
      events: {
        click: () => {
          router.go('/profile');
        },
      },
    });
    this.children.button_2 = new Button({
      text: 'Создать чат',
      events: {
        click: () => {
          toggleChatModal();
        },
      },
    });

    this.children.message = new ActiveChat({});

    this.children.button_1.element?.classList.add(...['button', 'chats-btn']);
    this.children.button_2.element?.classList.add('button');
    this.children.message.element?.classList.add('message');
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (
      (!isEqual(oldProps, newProps))
    ) {
      this.renderChats();
      console.log('activechat upd');
    }

    return !isEqual(oldProps, newProps);
  }

  renderChats() {
    console.log('render', this.props.activeChat?.id);
    this.children.chatList = this.props.chats.map(
      (chat: IChat) =>
        new Dialogue({
          events: {
            click: () => {
              store.set('activeChat', chat);
              ChatsController.fetchChatUsers(chat.id);
              
              console.log('store.state',store.state.activeChat?.id);
              console.log('this.props',this.props.activeChat?.id);
            },
          },
          id: +chat.id,
          name: chat.title,
          classTitle: 'dialogue__author',
          author: chat.id === this.props.user.id ? this.props.user.login : 'собеседник',
          lastMessage: chat.last_message ? chat.last_message.content : '',
          // time: 'пт',
          unreadCount: chat.unread_count,
          avatar: chat.avatar,
        })
    );
  }

  render() {
    if (this.props.chats) {
      this.renderChats();
    }
    return this.compile(template, this.props);
  }
}

function mapStateToProps(state: State) {
  return { chats: state.chats, activeChat: state.activeChat, user: state.user, };
}

export const Chats = withStore(mapStateToProps)(BaseChats);
