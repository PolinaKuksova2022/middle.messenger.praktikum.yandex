import { template } from './main.tmpl';
import Block from '../../utils/core/Block';
import { Button } from '../../component/button/button';

interface MainProps {
  title: string;
}
export class Main extends Block<MainProps> {
  constructor(props: MainProps) {
    super(props, 'div');
  }

  init() {
    this.children.button_1 = new Button({
      text: 'Авторизация',
      path: '/auth',
      // events: {
      //   click: () => window.location.href="/auth",
      // },
    });
    this.children.button_2 = new Button({
      text: 'Регистрация',
      path: '/registration',
      // events: {
      //   click: () => window.location.href="/registration",
      // },
    });
    this.children.button_3 = new Button({
      text: 'Профиль',
      path: '/profile',
      // events: {
      //   click: () => window.location.href="/profile",
      // },
    });
    this.children.button_4 = new Button({
      text: 'Лента переписки',
      path: '/chat',
      // events: {
      //   click: () => window.location.href="/chat",
      // },
    });
    this.children.button_5 = new Button({
      text: 'Error404',
      path: '*',
      // events: {
      //   click: () => window.location.href="*",
      // },
    });
    this.children.button_6 = new Button({
      text: 'Error500',
      path: '/internal-server-error',
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
    return this.compile(template, this.props);
  }
}
