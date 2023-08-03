import { ChatAPI, IChangeUser, IChatId, ICreateChat } from '../api/chats-api';
import store from '../utils/core/Store';

class ChatsController {
  private api = new ChatAPI();

  async fetchChats() {
    try {
      const chats = await this.api.getChats();

      store.set('chats', chats);
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
      alert((error as Record<string, string>).reason);
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

  async putAddUserToChat(data: IChangeUser) {
    try {
      await this.api.addUserToChat(data);

      await this.fetchChats();

      alert('Вы добавили собеседника');
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log((error as Record<string, string>).reason);
    }
  }

  async deleteUserFromChat(data: IChangeUser) {
    try {
      await this.api.removeUserFromChat(data);

      await this.fetchChats();

      alert('Вы удалили собеседника');
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log((error as Record<string, string>).reason);
    }
  }

  async fetchChatToken(token: number) {
    try {
      await this.api.requestChatToken(token);

      alert('Вы получили токен чата');
    } catch (error) {
      alert((error as Record<string, string>).reason);
      console.log((error as Record<string, string>).reason);
    }
  }
}

export default new ChatsController();
