import GroupUsers from '../../groupUsers/gropUsers';
import Block from '../../utils/core/Block';
import store, { State, withStore } from '../../utils/core/Store';
import isEqual from '../../utils/isEqual';
import { toggleActiveChatModal } from '../../utils/toggleModal';
import { inputIn, inputOut } from '../../utils/validate/inputValid';
import isAllValid from '../../utils/validate/isAllValid';
import ChatName from '../ChatName/ChatName';
import Button from '../button/button';
import InputGroup from '../form/inputGroup';
import KebabMenu from '../menu/kebabMenu';
import { MessagesList } from '../messagesList/messagesList';

class BaseActiveChat extends Block {
  init() {
    this.children.button = new Button({
      text: '➝',
      events: {
        click: (e) => {
          e.preventDefault();
          this.sendMessage();
        },
      },
    });

    this.children.chatName = new ChatName({
      chatName: '',
    });

    this.children.menu = new KebabMenu({
      text: '',
      events: {
        click: () => {
          if (this.props.activeChat.id) toggleActiveChatModal();
        },
      },
    });

    this.children.group = new InputGroup({
      name: 'message',
      label: 'Сообщение',
      inputClass: 'input-message',
      id: 'message',
      type: 'text',
      events: {
        focusout: (event) => inputOut(event),
        focusin: (event) => inputIn(event),
      },
      placeholder: 'Сообщение',
    });

    this.children.chatName.element?.classList.add('activeChat__title');
    this.children.menu.element?.classList.add('kebab-menu');
    this.children.button.element?.classList.add(...['button', 'round-btn']);
    this.children.group.element?.classList.add('activeChat__input');
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    this.children.messagesList = new MessagesList({});

    this.children.messagesList.element?.classList.add('activeChat__messagesList');

    return !isEqual(oldProps, newProps);
  }

  renderChatUsers() {
    if (this.props.activeChatUsers && this.props.activeChat) {
      (this.children.chatName as Block).setProps({
        chatName: this.props.activeChat?.title,
      });

      this.children.img = this.props.activeChatUsers?.map(
        (user: any) =>
          new GroupUsers({
            src: user.avatar,
            name: user.login,
          })
      );
    }
  }

  sendMessage() {
    const messageField = document.getElementsByName('message')[0];
    const messageValue = (messageField as HTMLInputElement).value;
    if (isAllValid({ message: messageValue })) {
      const activeChatSocket = store.state.socketList.find(
        (i: any) => i.id === this.props.activeChat.id
      );
      console.log(activeChatSocket);
      activeChatSocket.socket.sendMessage(messageValue);
      (messageField as HTMLInputElement).value = '';
    }
  }

  render() {
    this.renderChatUsers();

    return this.compile(
      `
      {{#if activeChat.title}}
        <div class="activeChat__header">
          <section class="activeChat__author">
            {{{img}}}
            {{{chatName}}}
          </section>
          {{{menu}}}
        </div>
      {{/if}}
      {{#if activeChat}}
        <div class="activeChat__field">

          {{#if activeChat.last_message}}
              {{{messagesList}}}
          {{else}}
            <div class="activeChat__empty activeChat__title">Тут пока нет сообщений</div>
          {{/if}}

          {{{from}}}
          {{{img}}}
          {{{to}}}
        </div>
        <div class="activeChat__footer">  
          {{{group}}}
          {{{button}}}
        </div>
      {{/if}}
      `,
      this.props
    );
  }
}

function mapStateToProps(state: State) {
  return {
    activeChatUsers: state.activeChatUsers,
    activeChat: state.activeChat,
  };
}

export const ActiveChat = withStore(mapStateToProps)(BaseActiveChat);
// <button class="button attach-btn">📎</button>
// <img name="avatar" class="avatar__img dialogue__img"  src="{{avatar}}" alt=""/>
