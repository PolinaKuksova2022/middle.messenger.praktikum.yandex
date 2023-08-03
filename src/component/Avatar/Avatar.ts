import Block from '../../utils/core/Block';

export interface AvatarProps {
  events: {
    click: () => void;
  };
  src: string;
}

export default class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super(props, 'section');
  }

  render() {
    return this.compile(
      `<img name="avatar" class="avatar__img" src="{{ src }}" alt=""/>
       <span class="avatar__text">Поменять аватар</span>`,
      this.props
    );
  }
}

//   `<section onclick="window.togglePhoto()" class="avatar">
//         <img name="avatar" class="avatar__img" src="{{ src }}" alt=""/>
//         <span class="avatar__text">Поменять аватар</span>
//     </section>`
