import { IMessage } from '../../controllers/WSControllers';
import Block from '../../utils/core/Block';
import store, { State, withStore } from '../../utils/core/Store';
import isEqual from '../../utils/isEqual';
import MessageText from '../activeChat/messegeText';

class BaseMessagesList extends Block {
  componentDidUpdate(oldProps: any, newProps: any): boolean {
    return !isEqual(oldProps, newProps);
  }

  renderMessages() {
    this.children.messagesList = this.props.activeChatMessages.map(
      (message: IMessage) =>
        new MessageText({
          text: message.content,
          time: message.time.match(/(?<=T)\d{2}:\d{2}/g)!.join(),
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
  return;
}

export const MessagesList = withStore(mapStateToProps)(BaseMessagesList);
