import Block from '../../utils/core/Block';

interface MessageImgProps {
  path: string;
  data: string;
}

export default class MessageImg extends Block<MessageImgProps> {
  constructor(props: MessageImgProps) {
    super(props, 'div');
  }

  render() {
    return this.compile(
      `
        <img class="message__img"  src="{{path}}" alt=""/>
        <p class="message__time">{{data}}</p>
      `,
      this.props
    );
  }
}
