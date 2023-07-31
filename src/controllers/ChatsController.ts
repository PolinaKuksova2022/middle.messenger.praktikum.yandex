import { ChatAPI, IChatId, ICreateChat } from '../api/chats-api';
import store from '../utils/core/Store';

class UserController {
  private api = new ChatAPI();

  async fetchChat() {
    try {
      await this.api.getChat();
    } catch (error) {
      console.log((error as Record<string, string>).reason);
    }
  }

  async postChat(data: ICreateChat) {
    try {
      await this.api.createChat(data);

      alert('Вы добавили чат');
    } catch (error) {
      console.log((error as Record<string, string>).reason);
    }
  }

//   async putProfile(data: IProfileData) {
//     try {
//       const profile = await this.api.profile(data);
//       store.set('user', profile);

//       alert('Вы изменили данные');
//     } catch (error) {
//       throw error;
//     }
//   }
}

export default new UserController();
