import Block from '../../utils/core/Block';

interface ButtonProps {
  text: string;
  path?: string;
  events?: {
    click: (e: Event) => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props, 'button');
  }

  render() {
    return this.compile(`<a href={{path}}>{{text}}</a>`, this.props);
  }
}
