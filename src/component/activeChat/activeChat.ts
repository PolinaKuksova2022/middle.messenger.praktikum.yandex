import WSControllers, { IMessage } from '../../controllers/WSControllers';
import GroupUsers from '../../groupUsers/gropUsers';
import convertDateTime from '../../utils/convertData';
import Block from '../../utils/core/Block';
import store, { State, withStore } from '../../utils/core/Store';
import isEqual from '../../utils/isEqual';
import { toggleActiveChatModal } from '../../utils/toggleModal';
import getInputsData from '../../utils/validate/getInputs';
import { inputIn, inputOut } from '../../utils/validate/inputValid';
import isAllValid from '../../utils/validate/isAllValid';
import ChatName from '../ChatName/ChatName';
import Button from '../button/button';
import InputGroup from '../form/inputGroup';
import KebabMenu from '../menu/kebabMenu';
import MessageImg from './messageImg';
import MessageText from './messegeText';

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
    // this.children.from = new MessageText({
    //   text: 'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
    //   data: '11:56',
    // });
    // this.children.img = new MessageImg({
    //   path: 'static/message_img.png',
    //   data: '12:00',
    // });
    // this.children.to = new MessageText({
    //   text: 'Круто!',
    //   data: '12:00',
    // });

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
    // this.children.from.element?.classList.add(...['activeChat__item', 'activeChat__item-from']);
    // this.children.img.element?.classList.add(...['activeChat__item', 'activeChat__item-from']);
    // this.children.to.element?.classList.add(...[activeChat__item', 'activeChat__item-to']);
    this.children.group.element?.classList.add('activeChat__input');
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    console.log('oldProps', oldProps)
    console.log('newProps', newProps)
    if (!isEqual(oldProps, newProps)) {
      // this.renderChatUsers();
      this.renderMessages();
    }
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

  renderMessages() {
    if (this.props.activeChat && this.props.messages[this.props.activeChat.id]) {
      console.log(this.props.messages[this.props.activeChat.id]);
      this.children.messagesList = this.props.messages[this.props.activeChat.id]?.map(
        (message: IMessage) =>
          new MessageText({
            text: message.content,
            time: message.time.match(/(?<=T)\d{2}:\d{2}/g)!.join(),
            classMessage:
              message.user_id === store.state.user?.id
                ? 'activeChat__item activeChat__item-to'
                : 'activeChat__item activeChat__item-from',
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
    console.log('activeChat', store.state.activeChat?.id);
    if (this.props.messages) {
      this.renderMessages();
    }

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
            <div class="activeChat__text">Тут пока нет сообщений</div>
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
      { ...this.props }
    );
  }
}

function mapStateToProps(state: State) {
  return {
    activeChatUsers: state.activeChatUsers,
    activeChat: state.activeChat,
    messages: state.messagesByChatId,
  };
}

export const ActiveChat = withStore(mapStateToProps)(BaseActiveChat);
// <button class="button attach-btn">📎</button>
// <img name="avatar" class="avatar__img dialogue__img"  src="{{avatar}}" alt=""/>
