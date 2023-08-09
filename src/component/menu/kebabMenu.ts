import Block from '../../utils/core/Block';

interface KebabMenuProps {
  text: string;
  events: {
    click: () => void;
  };
}

export default class KebabMenu extends Block<KebabMenuProps> {
  constructor(props: KebabMenuProps) {
    super(props, 'div');
  }

  render() {
    return this.compile(
      `
    <span></span>
    <span></span>
    <span></span>
`,
      this.props
    );
  }
}
