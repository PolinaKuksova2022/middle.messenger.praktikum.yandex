import { ChatAPI, IChangeUser, IChatId, ICreateChat } from '../api/chats-api';
import store from '../utils/core/Store';
import { closeModal } from '../utils/toggleModal';
import WSController from './WSControllers';

class ChatsController {
  private api = new ChatAPI();

  async fetchChats() {
    try {
      const chats = await this.api.getChats();

      store.set('chats', chats);

      if (Object.keys(chats!).length > 0) {
        const socketList: Record<string, any>[] = [];

        const chatFetching = Object.values(chats!).map(async (i: any) => {
          const chatToken = await this.fetchChatToken(i.id);

          socketList.push({
            id: i.id,
            socket: new WSController(String(store.state.user?.id), chatToken!, i.id),
          });
        });
        Promise.all(chatFetching);
        store.set('socketList', socketList);
      }
    } catch (error) {
      console.log((error as Record<string, string>).reason);
    }
  }

  async postChat(data: ICreateChat) {
    try {
      await this.api.createChat(data);

      await this.fetchChats();

      alert('Вы добавили чат');
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log((error as Record<string, string>).reason);
    }
  }

  async deleteChat(id: IChatId) {
    try {
      await this.api.removeChat(id);

      await this.fetchChats();

      alert('Вы удалили чат');
    } catch (error) {
      alert('Этот чат создал другой человек, вы не можете его удалить');
      console.log((error as Record<string, string>).reason);
    }
  }

  async fetchChatUsers(id: number) {
    try {
      const users = await this.api.getChatUsers(id);

      store.set('activeChatUsers', users);
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log((error as Record<string, string>).reason);
    }
  }

  async putAvatarToChat(data: FormData) {
    try {
      const user = await this.api.chatsAvatar(data);

      store.set('activeChat', user);

      alert('Вы изменили аватар чата');

      // закрыть модальное окно
      closeModal();
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log((error as Record<string, string>).reason);
    }
  }

  async putAddUserToChat(data: IChangeUser) {
    try {
      await this.api.addUserToChat(data);

      alert('Вы добавили собеседника');

      if (store.state.activeChat) {
        this.fetchChatUsers(store.state.activeChat.id);
      }
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log((error as Record<string, string>).reason);
    }
  }

  async deleteUserFromChat(data: IChangeUser) {
    try {
      await this.api.removeUserFromChat(data);

      alert('Вы удалили собеседника');

      if (store.state.activeChat) {
        this.fetchChatUsers(store.state.activeChat.id);
      }
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log((error as Record<string, string>).reason);
    }
  }

  async fetchChatToken(chatId: number): Promise<string | undefined> {
    try {
      const tokenObject = (await this.api.requestChatToken(chatId)) as any;
      return tokenObject.token!;
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log((error as Record<string, string>).reason);
      return undefined;
    }
  }
}

export default new ChatsController();
