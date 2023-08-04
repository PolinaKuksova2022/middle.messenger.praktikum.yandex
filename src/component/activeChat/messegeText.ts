import Block from '../../utils/core/Block';

interface MessageTextProps {
  text: string;
  time: string;
  classMessage: string;
}

export default class MessageText extends Block<MessageTextProps> {
  constructor(props: MessageTextProps) {
    super(props, 'div');
  }

  render() {
    return this.compile(
      `
      <section class="{{classMessage}}">
        <div class="message__text">{{text}}</div>
        <p class="message__time">{{time}}</p>
      </section>
      `,
      this.props
    );
  }
}
