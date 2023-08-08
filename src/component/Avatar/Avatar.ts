import Block from '../../utils/core/Block';

export interface AvatarProps {
  events: {
    click: () => void;
  };
  src: string;
  className: string;
}

export default class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super(props, 'section');
  }

  render() {
    return this.compile(
      `<img name="avatar" class="{{ className }}" src="{{ src }}" alt=""/>
       <span class="avatar__text">Поменять аватар</span>`,
      this.props
    );
  }
}
