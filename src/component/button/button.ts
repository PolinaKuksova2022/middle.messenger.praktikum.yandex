import Block from '../../utils/core/Block';

interface ButtonProps {
  text: string;
  events?: {
    click: (e: Event) => void;
  };
  id?: string;
}

export default class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super(props, 'button');
  }

  render() {
    return this.compile(`<a id="{{id}}">{{text}}</a>`, this.props);
  }
}
