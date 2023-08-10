import set from '../setAndMerge';
import { IUser } from '../../api/auth-api';
import EventBus from './EventBus';
import Block from './Block';
import { IActiveChat, IChat } from '../../api/chats-api';
import { IMessage } from '../../controllers/WSControllers';

export interface State {
  user?: IUser;
  activeChat?: IActiveChat;
  socketList?: any;
  chats?: IChat[] | null;
  activeChatUsers?: IUser[];
  messagesByChatId?: { [chatId: number]: IMessage[] };
}

export enum StoreEvents {
  Updated = 'updated',
}

// наследуем Store от EventBus, чтобы его методы были сразу доступны у экземпляра Store
class Store extends EventBus {
  public state: State = {};

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    // метод EventBus
    this.emit(StoreEvents.Updated, this.state);
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: State) => any) {
  return (Component: typeof Block) => {
    return class extends Component {
      constructor(props: any) {
        super({ ...props, ...mapStateToProps(store.getState()) });

        store.on(StoreEvents.Updated, () => {
          const propsFromState = mapStateToProps(store.getState());
          this.setProps(propsFromState);
        });
      }
    };
  };
}

export default store;
