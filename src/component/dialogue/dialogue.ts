import Block from '../../utils/core/Block';
import { togglePhoto } from '../../utils/toggleModal';
import Avatar from '../Avatar/Avatar';

interface DialogueProps {
  events: {
    click: () => void;
  };
  id: number;
  name: string;
  author: string;
  lastMessage?: string;
  classTitle: string;
  unreadCount?: number;
  avatarImg: string;
}
export default class Dialogue extends Block<DialogueProps> {
  constructor(props: DialogueProps) {
    super(props, 'li');
  }

  init() {
    this.children.avatar = new Avatar({
      events: {
        click: () => togglePhoto(),
      },
      src: `https://ya-praktikum.tech/api/v2/resources${this.props.avatarImg}`,
      className: 'avatar__img dialogue__img',
    });
  }

  render() {
    return this.compile(
      `
      <div class="dialogue">
        {{{avatar}}}
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
