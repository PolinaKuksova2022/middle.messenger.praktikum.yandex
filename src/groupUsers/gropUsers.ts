import Block from '../utils/core/Block';

export interface AvatarProps {
  src: string;
  name: string;
}

export default class GroupUsers extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super(props, 'section');
  }

  render() {
    return this.compile(
      `<img name="avatar" class="avatar__img dialogue__img"  src="https://ya-praktikum.tech/api/v2/resources{{ src }}" alt=""/>
        <p>{{ name }}</p>
      `,
      this.props
    );
  }
}
