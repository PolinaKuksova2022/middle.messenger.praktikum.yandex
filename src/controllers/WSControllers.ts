import store, { State } from '../utils/core/Store';
import ChatsController from './ChatsController';

export interface IMessage {
  content: string;
  id: number;
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
        console.log('data' , data);
        const messages = (Array.isArray(data) ? data : [data])
          .filter(x => x.type === "message");

        if(messages.length === 0)
          return;

        const messagesByChatId = store.state.messagesByChatId  
        ? JSON.parse(JSON.stringify(store.state.messagesByChatId)) as { [chatId: number] 
        : IMessage[]; } : {};
        const chatMessages = messagesByChatId[chatId] ?? [];

        chatMessages.push(...messages.filter(x => chatMessages.findIndex(y => y.id === x.id) === -1));
        messagesByChatId[chatId] = [...chatMessages];
        console.log('store.state.messagesByChatId1', store.state.messagesByChatId);
        store.set('messagesByChatId', messagesByChatId );
        console.log('store.state.messagesByChatId2', store.state.messagesByChatId);
//         if (Array.isArray(data)) {
//           if (!data.length) {
//             store.set('messages', []);
//           } else if (store.state.messages) {
//             const messages = [...store.state.messages, ...data];
//             console.log('here', messages);
//             store.set('messages', messages);
//           }
//         } else if (typeof data === 'object' && data.type === 'message') {
//           if (store.state.messages) {
//             const messages = [data, ...store.state.messages];
// console.log('aaaaaaaaaaaaaa', messages);
//             store.set('messages', messages);
//             ChatsController.fetchChats();
//           }
//         } 
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
