import Block from '../../utils/core/Block';
import Button from '../../component/button/button';
import template from './error500.tmpl';
import router from '../../router/router';

export default class Error500 extends Block {
  init() {
    this.children.button = new Button({
      text: 'Назад к чатам',
      events: {
        click: () => {
          router.go('/chat');
        },
      },
    });

    this.children.button.element?.classList.add(...['button', 'navigation-btn']);
  }

  render() {
    return this.compile(template, this.props);
  }
}
