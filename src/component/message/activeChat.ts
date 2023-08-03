import ChatsController from '../../controllers/ChatsController';
import GroupUsers from '../../groupUsers/gropUsers';
import Block from '../../utils/core/Block';
import { State, withStore } from '../../utils/core/Store';
import isEqual from '../../utils/isEqual';
import { toggleActiveChatModal } from '../../utils/toggleModal';
import { inputIn, inputOut } from '../../utils/validate/inputValid';
import InputGroup from '../form/inputGroup';
import KebabMenu from '../menu/kebabMenu';
import MessageImg from './messageImg';
import MessageText from './messegeText';

class BaseActiveChat extends Block {
  init() {
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

    this.children.menu.element?.classList.add('kebab-menu');
    // this.children.from.element?.classList.add(...['message__item', 'message__item-from']);
    // this.children.img.element?.classList.add(...['message__item', 'message__item-from']);
    // this.children.to.element?.classList.add(...['message__item', 'message__item-to']);
    this.children.group.element?.classList.add('message__input');
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if (!isEqual(oldProps, newProps)) {
      this.renderChatUsers();
    }
    return !isEqual(oldProps, newProps);
  }

  renderChatUsers() {
    if (this.props.activeChat && this.props.activeChatUsers) {
      this.children.img = this.props.activeChatUsers.map(
        (user: any) =>
          new GroupUsers({
            src: user.avatar,
            name: user.login,
          })
      );
    }
  }

  render() {
    this.renderChatUsers();

    return this.compile(
      `
      <div class="message__header">
        {{#if activeChat.title}}
          <section class="message__author">
            {{{img}}}
            <h4 class="dialogue__author">{{ activeChat.title }}</h4>  
          </section>
          {{/if}}
        {{{menu}}}
      </div>
      {{#if user.id}}
        <div class="message__field">
          {{{from}}}
          {{{img}}}
          {{{to}}}
        </div>
        <div class="message__footer">  
          {{{group}}}
          <button class="button round-btn" >➝</button>
        </div>
      {{/if}}
      `,
      { ...this.props }
    );
  }
}

function mapStateToProps(state: State) {
  return {
    activeChat: state.activeChat,
    activeChatUsers: state.activeChatUsers,
  };
}

export const ActiveChat = withStore(mapStateToProps)(BaseActiveChat);
// <button class="button attach-btn">📎</button>
// <img name="avatar" class="avatar__img dialogue__img"  src="{{avatar}}" alt=""/>
