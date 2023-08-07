import store, { State } from '../utils/core/Store';
import ChatsController from './ChatsController';

export interface IMessage {
  chat_id: number;
  content: string;
  id: number;
  file: any;
  is_read: boolean;
  time: string;
  type: string;
  user_id: number;
}
class WSController {
  state: State;
  token: string;
  chatId: number;
  userId: string;
  socket: WebSocket;
  ping!: ReturnType<typeof setInterval>;

  constructor(userId: string, token: string, chatId: number) {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

    this.state = store.getState();
    this.token = token;
    this.chatId = chatId;
    this.userId = userId;

    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      this.socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        })
      );

      this.ping = setInterval(() => {
        this.socket.send(JSON.stringify({ type: 'ping' }));
      }, 10000);
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }
      clearInterval(this.ping);
      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);

        const messages = (Array.isArray(data) ? data.reverse() : [data]).filter(
          (x) => x.type === 'message'
        );

        if (messages.length === 0) return;

        const messagesByChatId = store.state.messagesByChatId
          ? (JSON.parse(JSON.stringify(store.state.messagesByChatId)) as {
              [chatId: number]: IMessage[];
            })
          : {};
        const chatMessages = messagesByChatId[chatId] ?? [];

        chatMessages.push(
          ...messages.filter((x) => chatMessages.findIndex((y) => y.id === x.id) === -1)
        );
        messagesByChatId[chatId] = [...chatMessages];

        store.set('messagesByChatId', messagesByChatId);
      } catch (error) {
        console.log(error);
      }
    });

    this.socket.addEventListener('error', (error) => {
      console.log('Ошибка', error);
    });
  }

  public sendMessage(message: string) {
    console.log('sEEEEEEEEEEEEEEEnt', message);
    this.socket.send(JSON.stringify({ content: message, type: 'message' }));

    // ChatsController.fetchChats();
  }
}

export default WSController;
