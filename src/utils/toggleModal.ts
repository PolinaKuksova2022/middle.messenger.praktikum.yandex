import ChatModal from '../component/modal/addChat';
import { ChangeChat } from '../component/modal/changeChat';
import { Password } from '../component/modal/password';
import Photo from '../component/modal/photo';
import Block from './core/Block';

const app = document.getElementById('app');

function openModal(modal: Block) {
  const article = document.createElement('article');
  article.className = 'modal';
  article.id = 'modalData';
  article.appendChild(modal.getContent()!);
  app!.append(article);
}

export function closeModal() {
  const app = document.getElementById('app');
  const modalPassword = document.getElementById('modalData');
  if (modalPassword) {
    app?.removeChild(modalPassword);
  }
}

export function togglePhoto() {
  const modal = new Photo({});
  openModal(modal);
}

export function togglePassword() {
  const modal = new Password({});
  openModal(modal);
}

export function toggleChatModal() {
  const modal = new ChatModal({});
  openModal(modal);
}

export function toggleActiveChatModal() {
  const modal = new ChangeChat({});
  openModal(modal);
}
