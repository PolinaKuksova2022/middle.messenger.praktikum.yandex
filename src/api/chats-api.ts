import { API } from './api';

export interface ICreateChat {
  title: string;
}

export interface IChatId {
  chatId: number;
}

export interface IChangeUser {
  user: number[];
  chatId: number;
}

export class ChatAPI extends API {
  constructor() {
    super('/chats');
  }

  getChat() {
    return this.http.get(`/`);
  }

  createChat(data: ICreateChat) {
    return this.http.post(`/`, data);
  }

  removeChat(data: IChatId) {
    return this.http.delete('/', data);
  }

  addUserToChat(data: IChangeUser) {
    return this.http.put('/users', data);
  }

  deleteUserFromChat(data: IChangeUser) {
    return this.http.delete('/users', data);
  }

  getChatToken(chatId: number) {
    return this.http.get(`/token/${chatId}`);
  }
}
