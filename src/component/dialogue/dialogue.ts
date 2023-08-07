import Block from '../../utils/core/Block';

interface DialogueProps {
  events: {
    click: () => void;
  };
  id: number;
  name: string;
  author: string;
  lastMessage?: string;
  classTitle: string;
  // time: string;
  unreadCount?: number;
  avatar: string;
}
export default class Dialogue extends Block<DialogueProps> {
  constructor(props: DialogueProps) {
    super(props, 'li');
  }

  // componentDidUpdate(oldProps: any, newProps: any): boolean {
  //   return !isEqual(oldProps, newProps);
  // }

  render() {
    return this.compile(
      `
      <div class="dialogue">
        <img name="avatar" class="avatar__img dialogue__img"  src="{{avatar}}" alt=""/>
        <div class="dialogue__info">
          <h4 class="{{classTitle}}">{{name}}</h4>
          <h4 class="dialogue__author">{{author}}</h4>
          <h5 class="dialogue__content">{{lastMessage}}</h5>
        </div>
      </div>
      `,
      this.props
    );
  }
}

// <div class="dialogue__addition">
// <h4 class="dialogue__time">{{time}}</h4>
// <h5 class="dialogue__count">{{unreadCount}}</h5>
// </div>
