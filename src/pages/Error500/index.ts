import Block from '../../utils/core/Block';
import { Button } from '../../component/button/button';
import { template } from './error500.tmpl';

interface Error500Props {
  title: string;
}
export class Error500 extends Block<Error500Props> {
  constructor(props: Error500Props) {
    super(props, 'div');
  }

  init() {
    this.children.button = new Button({
      text: 'Назад к чатам',
      path: '/chat',
      // events: {
      //   click: () => window.location.href="/chat",
      // },
    });

    this.children.button.element?.classList.add(...['button', 'navigation-btn']);
  }

  render() {
    return this.compile(template, this.props);
  }
}
