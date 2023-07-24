import template from './main.tmpl';
import Block from '../../utils/core/Block';
import Button from '../../component/button/button';
import router from '../../router/router';
export default class Main extends Block {
  init() {
    this.children.button_1 = new Button({
      text: 'Авторизация',
      events: {
        click: () => {
          router.go('/auth');
        },
      },
      // path: '/auth',
      // events: {
      //   click: () => window.location.href="/auth",
      // },
    });
    this.children.button_2 = new Button({
      text: 'Регистрация',
      events: {
        click: () => {
          router.go('/registration');
        },
      },
      // path: '/registration',
      // events: {
      //   click: () => window.location.href="/registration",
      // },
    });
    this.children.button_3 = new Button({
      text: 'Профиль',
      events: {
        click: () => {
          router.go('/profile');
        },
      },
      // path: '/profile',
      // events: {
      //   click: () => window.location.href="/profile",
      // },
    });
    this.children.button_4 = new Button({
      text: 'Лента переписки',
      events: {
        click: () => {
          router.go('/chat');
        },
      },
      // path: '/chat',
      // events: {
      //   click: () => window.location.href="/chat",
      // },
    });
    this.children.button_5 = new Button({
      text: 'Error404',
      events: {
        click: () => {
          router.go('*');
        },
      },
      // path: '*',
      // events: {
      //   click: () => window.location.href="*",
      // },
    });
    this.children.button_6 = new Button({
      text: 'Error500',
      events: {
        click: () => {
          router.go('/internal-server-error');
        },
      },
      // path: '/internal-server-error',
      // events: {
      //   click: () => window.location.href="/internal-server-error",
      // },
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
