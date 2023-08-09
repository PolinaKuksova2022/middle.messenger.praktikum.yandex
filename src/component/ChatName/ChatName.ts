import Block from '../../utils/core/Block';

export interface ChatNameProps {
  chatName: string;
}
export default class ChatName extends Block<ChatNameProps> {
  constructor(props: ChatNameProps) {
    super(props, 'h4');
  }

  render() {
    return this.compile(`{{ chatName }} `, this.props);
  }
}
