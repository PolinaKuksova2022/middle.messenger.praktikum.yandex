import Block from '../../utils/core/Block';

interface DialogueProps {
  author: string;
  content: string;
  time: string;
  count: string;
  avatar: string;
}
export default class Dialogue extends Block<DialogueProps> {
  constructor(props: DialogueProps) {
    super(props, 'li');
  }

  render() {
    return this.compile(
      `
      <img name="avatar" class="avatar__img dialogue__img"  src="{{avatar}}" alt=""/>
      <div class="dialogue__info">
        <h4 class="dialogue__author">{{author}}</h4>
        <h5 class="dialogue__content">{{content}}</h5>
      </div>
      <div class="dialogue__addition">
        <h4 class="dialogue__time">{{time}}</h4>
        <h5 class="dialogue__count">{{count}}</h5>
      </div>
      `,
      this.props
    );
  }
}
