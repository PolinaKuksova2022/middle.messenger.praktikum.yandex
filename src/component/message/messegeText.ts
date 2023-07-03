import Block from '../../utils/core/Block';

interface MessageTextProps {
  text: string;
  data: string;
}

export default class MessageText extends Block<MessageTextProps> {
  constructor(props: MessageTextProps) {
    super(props, 'div');
  }

  render() {
    return this.compile(
      `
        <div class="message__text">{{text}}</div>
        <p class="message__time">{{data}}</p>
      `,
      this.props
    );
  }
}
