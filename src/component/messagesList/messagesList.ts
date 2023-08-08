import { IMessage } from '../../controllers/WSControllers';
import Block from '../../utils/core/Block';
import store, { State, withStore } from '../../utils/core/Store';
import isEqual from '../../utils/isEqual';
import MessageText from '../activeChat/messageText';

class BaseMessagesList extends Block {
  componentDidUpdate(oldProps: any, newProps: any): boolean {
    return !isEqual(oldProps, newProps);
  }

  renderMessages() {
    this.children.messagesList = this.props.activeChatMessages.map(
      (message: IMessage) =>
        new MessageText({
          text: message.content,
          time: new Date(message.time).toLocaleTimeString('ru-RU', {
            timeZone: 'Europe/Moscow',
            hour12: false,
            hour: 'numeric',
            minute: 'numeric',
          }),
          classMessage:
            message.user_id === store.state.user?.id
              ? 'activeChat__item activeChat__item-to'
              : 'activeChat__item activeChat__item-from',
        })
    );
  }

  render() {
    if (this.props.activeChatMessages) {
      this.renderMessages();
    }

    return this.compile(
      `
        {{{messagesList}}}
      `,
      this.props
    );
  }
}

function mapStateToProps(state: State) {
  if (state.messagesByChatId && state.activeChat) {
    const activeChatMessages = state.messagesByChatId[state.activeChat.id];
    return {
      activeChatMessages,
    };
  }

  return {};
}

const MessagesList = withStore(mapStateToProps)(BaseMessagesList);

export default MessagesList;
