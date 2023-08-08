import template from './main.tmpl';
import Block from '../../utils/core/Block';
import Button from '../../component/button/button';
import router from '../../router/router';

export default class Main extends Block {
  constructor() {
    super({});
  }

  init() {
    this.children.button_1 = new Button({
      text: 'Авторизация',
      events: {
        click: () => {
          router.go('/auth');
        },
      },
    });
    this.children.button_2 = new Button({
      text: 'Регистрация',
      events: {
        click: () => {
          router.go('/registration');
        },
      },
    });
    this.children.button_3 = new Button({
      text: 'Профиль',
      events: {
        click: () => {
          router.go('/profile');
        },
      },
    });
    this.children.button_4 = new Button({
      text: 'Лента переписки',
      events: {
        click: () => {
          router.go('/chat');
        },
      },
    });
    this.children.button_5 = new Button({
      text: 'Error404',
      events: {
        click: () => {
          router.go('*');
        },
      },
    });
    this.children.button_6 = new Button({
      text: 'Error500',
      events: {
        click: () => {
          router.go('/internal-server-error');
        },
      },
    });

    this.children.button_1.element?.classList.add('button');
    this.children.button_2.element?.classList.add('button');
    this.children.button_3.element?.classList.add('button');
    this.children.button_4.element?.classList.add('button');
    this.children.button_5.element?.classList.add('button');
    this.children.button_6.element?.classList.add('button');
  }

  render() {
    return this.compile(template, { title: 'Навигация' });
  }
}
