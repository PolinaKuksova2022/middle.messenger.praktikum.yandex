import Block from '../../utils/core/Block';
import { Button } from '../../component/button/button';
import { template } from './error404.tmpl';

interface Error404Props {
  title: string;
}
export class Error404 extends Block<Error404Props> {
  constructor(props: Error404Props) {
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
