import { ChatAPI, IChangeUser, IChatId, ICreateChat } from '../api/chats-api';
import store from '../utils/core/Store';
import WSController from './WSControllers';

class ChatsController {
  private api = new ChatAPI();

  async fetchChats() {
    try {
      const chats = await this.api.getChats();

      store.set('chats', chats);

      if (Object.keys(chats!).length > 0) {
        const socketList: Record<string, any>[] = [];
        
        const chatFetching = Object.values(chats!).map(async (i) => {
          const chatToken = await this.fetchChatToken(i.id);

          socketList.push({
            id: i.id,
            socket: new WSController(String(store.state.user?.id), chatToken!, i.id),
          });
        });
        Promise.all(chatFetching);
        store.set('socketList', socketList);
        console.log('socketList', socketList);
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
      // store.set('activeChat', chat);
      store.set('activeChatUsers', users);
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log((error as Record<string, string>).reason);
    }
  }

  async putAddUserToChat(data: IChangeUser) {
    try {
      await this.api.addUserToChat(data);

      // await this.fetchChats();

      alert('Вы добавили собеседника');
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log((error as Record<string, string>).reason);
    }
  }

  async deleteUserFromChat(data: IChangeUser) {
    try {
      await this.api.removeUserFromChat(data);

      // await this.fetchChats();

      alert('Вы удалили собеседника');
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log((error as Record<string, string>).reason);
    }
  }

  async fetchChatToken(chatId: number) {
    try {
      const tokenObject = (await this.api.requestChatToken(chatId)) as any;
      return tokenObject.token!;
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log((error as Record<string, string>).reason);
    }
  }
}

export default new ChatsController();
