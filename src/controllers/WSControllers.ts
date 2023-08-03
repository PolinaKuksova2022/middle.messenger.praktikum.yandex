import store, { State } from '../utils/core/Store';
import ChatsController from './ChatsController';

class WSController {
  state: State;
  token: string | undefined;
  chatId: number | undefined;
  userId: number | undefined;
  socket: WebSocket;

  constructor() {
    this.state = store.getState();
    this.userId = this.state.user?.id;
    this.chatId = this.state.activeChat?.id;
    this.token = this.state.chatToken;

    this.socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${this.userId}/${this.token}/${this.chatId}`
    );

    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      this.socket.send(
        JSON.stringify({
          content: 'Моё первое сообщение миру!',
          type: 'message',
        })
      );
    });

    this.socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('message', (event) => {
      console.log('Получены данные', event.data);
    });

    this.socket.addEventListener('error', (error) => {
      console.log('Ошибка', error);
    });
  }

  sendMessage(message: string) {
    this.socket.send(JSON.stringify({ type: 'message', content: message }));

    ChatsController.fetchChats();
  }
}

export default new WSController();
