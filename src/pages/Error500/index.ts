import Block from '../../utils/core/Block';
import Button from '../../component/button/button';
import template from './error500.tmpl';
import router from '../../router/router';
import Routes from '../../main';

export default class Error500 extends Block {
  init() {
    this.children.button = new Button({
      text: 'Назад к чатам',
      events: {
        click: () => {
          router.go(Routes.Chat);
        },
      },
    });

    this.children.button.element?.classList.add(...['button', 'navigation-btn']);
  }

  render() {
    return this.compile(template, this.props);
  }
}
