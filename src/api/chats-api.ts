import { API } from './api';
import { IUser } from './auth-api';

export interface ICreateChat {
  title: string;
}

export interface IChatId {
  chatId: number;
}

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: IUser;
    time: string;
    content: string;
  };
}

export interface IChangeUser {
  users: number[];
  chatId: number;
}

export class ChatAPI extends API {
  constructor() {
    super('/chats');
  }

  getChats() {
    // GET /chats — получить чаты текущего пользователя;
    return this.http.get(`/`);
  }

  createChat(data: ICreateChat) {
    //POST /chats — создать чат;
    return this.http.post(`/`, data);
  }

  removeChat(id: IChatId) {
    //DELETE /chats — удалить чат по его ID;
    return this.http.delete('/', id);
  }

  getChatUsers(id: number) {
    //GET /chats/:id/users — получить пользователей чата по ID;
    return this.http.get(`/${id}/users`);
  }

  addUserToChat(data: IChangeUser) {
    //PUT /chats/users — добавить пользователя в чат;
    return this.http.put('/users', data);
  }

  removeUserFromChat(data: IChangeUser) {
    //DELETE /chats/users — удалить пользователей из чата.
    return this.http.delete('/users', data);
  }

  requestChatToken(chatId: number) {
    //
    return this.http.post(`/token/${chatId}`);
  }
}
