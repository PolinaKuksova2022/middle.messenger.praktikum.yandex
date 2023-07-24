import Block from '../../utils/core/Block';
import Button from '../../component/button/button';
import template from './chats.tmpl';
import Dialogue from '../../component/dialogue/dialogue';
import Message from '../../component/message/message';
import router from '../../router/router';

export default class Chats extends Block {
  init() {
    this.children.button = new Button({
      text: 'Профиль >',
      events: {
        click: () => {
          router.go("/profile");
        },
      },
      // path: '/profile',
    });

    this.children.dialogue_1 = new Dialogue({
      author: 'Андрей',
      content: 'Изображение',
      time: '10:49',
      count: '2',
      avatar: '',
    });
    this.children.dialogue_2 = new Dialogue({
      author: 'Вадим',
      content: 'Круто',
      time: 'пт',
      count: '3',
      avatar: '',
    });
    this.children.message = new Message({
      author: 'Вадим',
      avatar: '',
    });

    this.children.button.element?.classList.add(...['button', 'chats-btn']);
    this.children.dialogue_1.element?.classList.add('dialogue');
    this.children.dialogue_2.element?.classList.add('dialogue');
    this.children.message.element?.classList.add('message');
  }

  render() {
    return this.compile(template, { title: 'chat' });
  }
}
